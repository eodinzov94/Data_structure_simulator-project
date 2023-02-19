import { TypedRequestBody } from '../types/RequestType.js'
import { NextFunction, Response } from 'express'
import TWOFA from '../models/2FA.js'
import ApiError from '../error/ApiError.js'
import { CODE_TYPES, RESET_PW_2FA_BODY, SET_2FA_STATUS_BODY, TWOFA_VERIFY_BODY } from '../types/TWOFA_Types.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { mailer } from '../nodemailer/MailSender.js'
import { generateJwt } from './UserController.js'


export const TWO_FA_verifier = async (code: string, type: CODE_TYPES, email: string) => {
  if (!code || !type || !email) {
    throw new ApiError(401, '2FA required')
  }
  const match = await TWOFA.findOne({ where: { code, type: type.toString(), email } })
  if (!match) {
    throw new ApiError(401, 'Code is incorrect')
  }
  const diffInMinutes = Math.floor(((Date.now() - match.updatedAt.valueOf()) / 1000) / 60)
  if (diffInMinutes > 5) {
    throw new ApiError(401, '2FA Code expired')
  }
}

export const ServiceSendCode = async(type: CODE_TYPES, email: string) => {
  const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
  await TWOFA.upsert({ email, code: code.toString(), type })
  mailer(`${type} Code`,code.toString(),email)
}








class TwoFactorAuthController {
  async send2FA_Code(req: TypedRequestBody<{ type: CODE_TYPES, email: string }>, res: Response, next: NextFunction) {
    const { type, email } = req.body


    try {
      await ServiceSendCode(type,email)
      return res.json({ status: 'Code sent' })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Input error'
      return next(ApiError.badRequest(message))
    }
  }

  async verify(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { code, type, email } = req.body
      await TWO_FA_verifier(code, type, email)
      const user = await User.findOne({ where: { email } })
      if(!user){
        return res.status(500).json({ message:'Unknown error, user not found' })
      }
      const accessToken  = generateJwt(user)
      return res.json({ status: 'OK',accessToken,user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }, })
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
      return res.json({ status: 'Password changed' })
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
      res.json({ status: '2FA status updated successfully' })
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Unknown error' })
    }
  }

  async verifyEmail(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      await User.update({ isEmailConfirmed: true }, { where: { email } })
      res.json({ status: 'Email confirmed successfully' })
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Unknown error' })
    }

  }
}

export default new TwoFactorAuthController()