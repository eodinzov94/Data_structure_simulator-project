import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import roleCheckMiddleware from '../middleware/CheckRoleMiddleware.js'
import StatisticsController from '../controllers/StatisticsController.js'

const router = Router()
router.post('/register-lecturer',roleCheckMiddleware('Lecturer'), UserController.registration)//X
router.get('/report/algo-report',roleCheckMiddleware('Lecturer'), StatisticsController.getAllActivities)//X
router.get('/report/general-report',roleCheckMiddleware('Lecturer'), StatisticsController.generalReport)//V
export default router