import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import roleCheckMiddleware from '../middleware/CheckRoleMiddleware.js'
import StatisticsController from '../controllers/StatisticsController.js'

const router = Router()
router.post('/register-lecturer',roleCheckMiddleware('Lecturer'), UserController.registration)
router.get('/statistics/get-all-activities',roleCheckMiddleware('Lecturer'), StatisticsController.getAllActivities)
router.get('/statistics/active-users-count',roleCheckMiddleware('Lecturer'), StatisticsController.activeUsers)
router.get('/statistics/all-users-count',roleCheckMiddleware('Lecturer'), StatisticsController.allUsers)
router.get('/statistics/user-details',roleCheckMiddleware('Lecturer'), StatisticsController.usersDetails)
export default router