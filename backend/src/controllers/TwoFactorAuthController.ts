import { TypedRequestBody } from '../types/RequestType.js'
import { NextFunction, Response } from 'express'
import TWOFA from '../models/2FA.js'
import ApiError from '../error/ApiError.js'

enum CODE_TYPES {
  RESET_PW='RESET_PW',
  VERIFY_EMAIL='VERIFY_EMAIL',
  TWO_FA='2FA',
  CHANGE_PW='CHANGE_PW'
}

class TwoFactorAuthController {
  async send2FA_Code(req: TypedRequestBody<{ type: CODE_TYPES, email:string }>, res: Response, next: NextFunction) {
    const { type,email } = req.body
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    try {
      const authCode = await TWOFA.upsert({email,code:code.toString(),type,ValidDate:new Date()})
      //TODO: await sendToMail
      return res.json({status:'Code sent'})
    } catch (e: any) {
      return res.json(ApiError.badRequest(e?.errors[0]?.message || 'Input error'))
    }
  }
  //code verify??
  async resetPassword(req: TypedRequestBody<{email:string }>, res: Response, next: NextFunction) {

  }

  async changePassword() {

  }

  async login() {

  }

  async enable() {

  }

  async disable() {

  }
}

export default new TwoFactorAuthController()