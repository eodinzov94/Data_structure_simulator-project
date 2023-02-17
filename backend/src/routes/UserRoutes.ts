import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
import TwoFactorAuthController from '../controllers/TwoFactorAuthController.js'
import Verify2FA_MW from '../middleware/Verify2FA_Middleware.js'
import { CODE_TYPES } from '../types/TWOFA_Types.js'


const router = Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.post('/send-2fa-code', TwoFactorAuthController.send2FA_Code)
router.post('/register-activity',authMiddleware, UserController.registerActivity)
router.post('/update-user-data',authMiddleware, UserController.updateUser)
router.get('/auth-me', authMiddleware, UserController.auth)
router.post('/login-2fa',Verify2FA_MW(CODE_TYPES.TWO_FA),UserController.login2FA)
router.get('/personal-activities', authMiddleware, UserController.personalActivities)
router.post('/verify-2fa',TwoFactorAuthController.verify)
router.post('/verify-email',Verify2FA_MW(CODE_TYPES.VERIFY_EMAIL),TwoFactorAuthController.verifyEmail)
router.post('/set-2fa-status',Verify2FA_MW(CODE_TYPES.TWO_FA),TwoFactorAuthController.set2FA_status)
router.post('/reset-password',Verify2FA_MW(CODE_TYPES.RESET_PW),TwoFactorAuthController.resetPassword)
export default router