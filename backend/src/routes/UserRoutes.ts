import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
import TwoFactorAuthController from '../controllers/TwoFactorAuthController.js'


const router = Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.post('/send-2fa-code', TwoFactorAuthController.send2FA_Code) // TODO:
router.post('/register-activity',authMiddleware, UserController.registerActivity)
router.get('/auth', authMiddleware, UserController.auth)
router.get('/personal-activities', authMiddleware, UserController.personalActivities)
/*router.post('/verify-email',authMiddleware)
router.post('/reset-password',TwoFactorAuthController.resetPassword)
router.post('/change-password',authMiddleware,TwoFactorAuthController.changePassword)
router.post('/login-2fa',TwoFactorAuthController.login)
router.post('/enable-2fa',authMiddleware,TwoFactorAuthController.enable)
router.post('/disable-2fa',authMiddleware,TwoFactorAuthController.disable)*/
export default router