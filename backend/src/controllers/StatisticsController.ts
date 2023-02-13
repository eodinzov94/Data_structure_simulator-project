import User from '../models/User.js'
import { NextFunction, Request, Response } from 'express'
import UserActivity from '../models/UserActivity.js'
import moment from 'moment'
import { Op } from 'sequelize'


class StatisticsController {
  async getAllActivities(req: Request, res: Response, next: NextFunction) {
    const allData = await UserActivity.findAll()
    return res.json({allData})
  }

  async allUsers(req: Request, res: Response, next: NextFunction) {
      const usersCount = await User.count({where:{role:'Student'}})
      return res.json({usersCount})

  }
  async activeUsers(req: Request, res: Response, next: NextFunction) {
    const usersCount = await User.count({where:{ lastSeen:{[Op.gte]: moment().subtract(14, 'days').toDate() },role:'Student'  }})
    return res.json({usersCount})
  }
  async usersDetails(req: Request, res: Response, next: NextFunction) {
     const allUsers = await User.findAll({attributes: ['email','gender', 'birthYear','firstName','lastName','lastSeen']})
     return res.json({allUsers})
  }
  async
}

export default new StatisticsController()