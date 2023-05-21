import { TypedRequestBody } from '../types/RequestType.js'
import { NextFunction, Response } from 'express'
import TWOFA from '../models/2FA.js'
import ApiError from '../error/ApiError.js'
import { CODE_TYPES, RESET_PW_2FA_BODY, SET_2FA_STATUS_BODY, TWOFA_VERIFY_BODY } from '../types/TWOFA_Types.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { mailer } from '../nodemailer/MailSender.js'
import { generateConfirmMailToken, generateJwt } from './UserController.js'
import dotenv from 'dotenv'
import pkg from 'jsonwebtoken'

const { verify } = pkg
dotenv.config()

export const TWO_FA_verifier = async (code: string, type: CODE_TYPES, email: string) => {
  if (!code || !type || !email) {
    throw new ApiError(401, '2FA required')
  }
  const match = await TWOFA.findOne({ where: { code, type: type.toString(), email } })
  if (!match) {
    throw new ApiError(401, 'Code is incorrect')
  }
  const diffInMinutes = Math.floor((Date.now() - match.updatedAt.valueOf()) / 1000 / 60)
  if (diffInMinutes > 5) {
    throw new ApiError(401, '2FA Code expired')
  }
}

export const ServiceSendCode = async (type: CODE_TYPES, email: string) => {
  if (type !== 'VERIFY_EMAIL') {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    await TWOFA.upsert({ email, code: code.toString(), type })
    mailer(`${type} Code`, code.toString(), email)
    return
  }
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw ApiError.forbidden('Error sending email')
  }
  const token = generateConfirmMailToken(email)
  mailer(
    `Email verification`,
    `To verify the email follow the link : 
    http://${process.env.FRONT_IP || 'localhost:3000'}/verify-email/${token}`,
    email
  )
}

class TwoFactorAuthController {
  async send2FA_Code(req: TypedRequestBody<{ type: CODE_TYPES; email: string }>, res: Response, next: NextFunction) {
    const { type, email } = req.body
    try {
      await ServiceSendCode(type, email)
      return res.json({ status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = 'Error sending email'
      return next(ApiError.badRequest(message))
    }
  }

  async verify(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { code, type, email } = req.body
      await TWO_FA_verifier(code, type, email)
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(500).json({ message: 'Unknown error, user not found' })
      }
      const accessToken = generateJwt(user)
      if (type === '2FA') {
        if (user.role == 'Lecturer') {
          return res.json({
            status: 'OK',
            token: accessToken,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              is2FA: user.isEnabled2FA
            }
          })
        }
        return res.json({
          status: 'OK',
          token: accessToken,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            birthYear: user.birthYear,
            gender: user.gender,
            is2FA: user.isEnabled2FA
          }
        })
      } else {
        return res.json({ status: 'OK' })
      }
    } catch (e: any) {
      const message = e?.message || 'Unknown error'
      return res.status(401).json({ message })
    }
  }

  async resetPassword(req: TypedRequestBody<RESET_PW_2FA_BODY>, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body
      if (!password || password.length < 8) {
        return next(ApiError.badRequest('Password should be at least 8 char length'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      await User.update({ password: hashPassword }, { where: { email } })
      return res.json({ status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Input error'
      return next(ApiError.badRequest(message))
    }
  }

  async set2FA_status(req: TypedRequestBody<SET_2FA_STATUS_BODY>, res: Response, next: NextFunction) {
    try {
      const { status, email } = req.body
      await User.update({ isEnabled2FA: status }, { where: { email } })
      res.json({ status: 'OK' })
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Unknown error' })
    }
  }

  async verifyEmail(req: TypedRequestBody<{ token: string }>, res: Response, next: NextFunction) {
    try {
      const { token } = req.body
      if (!token) {
        return res.status(401).json({ message: 'Verify token is required' })
      }
      const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as { email: string; type: CODE_TYPES }
      await User.update({ isEmailConfirmed: true }, { where: { email: decoded.email } })
      res.json({ status: 'OK' })
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Error verifying the email' })
    }
  }
}

export default new TwoFactorAuthController()
