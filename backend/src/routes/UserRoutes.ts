import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'


const router = Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)

export default router