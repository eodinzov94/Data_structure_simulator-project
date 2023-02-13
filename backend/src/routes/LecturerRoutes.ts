import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import roleCheckMiddleware from '../middleware/CheckRoleMiddleware.js'
import StatisticsController from '../controllers/StatisticsController.js'

const router = Router()
router.post('/register-lecturer',roleCheckMiddleware('Lecturer'), UserController.registration)
router.get('/report/algo-report',roleCheckMiddleware('Lecturer'), StatisticsController.getAllActivities)
//TODO: add roleCheckMiddleware('Lecturer') back to /report/general-report
router.get('/report/general-report', StatisticsController.generalReport)
export default router