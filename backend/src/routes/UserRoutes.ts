import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
import TwoFactorAuthController from '../controllers/TwoFactorAuthController.js'
import Verify2FA_MW from '../middleware/Verify2FA_Middleware.js'
import { CODE_TYPES } from '../types/TWOFA_Types.js'
import FeedbackController from '../controllers/FeedbackController.js'


const router = Router()
router.post('/register', UserController.registration) //V
router.post('/login', UserController.login)//V
router.post('/send-2fa-code', TwoFactorAuthController.send2FA_Code)//Need to add resend button Front
router.post('/register-activity',authMiddleware, UserController.registerActivity)//X
router.post('/update-user-data',authMiddleware, UserController.updateUser)//X
router.get('/auth-me', authMiddleware, UserController.auth)//V
router.post('/login-2fa',Verify2FA_MW(CODE_TYPES.TWO_FA),UserController.login2FA)//V
router.get('/personal-activities', authMiddleware, UserController.personalActivities)//X
router.post('/verify-2fa',TwoFactorAuthController.verify)//V
router.post('/verify-email',TwoFactorAuthController.verifyEmail)//X
router.post('/set-2fa-status',Verify2FA_MW(CODE_TYPES.TWO_FA),TwoFactorAuthController.set2FA_status)//X
router.post('/reset-password',Verify2FA_MW(CODE_TYPES.RESET_PW),TwoFactorAuthController.resetPassword)//V
router.post('/post-feedback',FeedbackController.create)
export default router