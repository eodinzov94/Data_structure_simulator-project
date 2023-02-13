import User from '../models/User.js'
import { NextFunction, Request, Response } from 'express'
import UserActivity from '../models/UserActivity.js'
import moment from 'moment'
import { Op, QueryTypes } from 'sequelize'
import { sequelize } from '../db.js'


class StatisticsController {
  async getAllActivities(req: Request, res: Response, next: NextFunction) {
    const allData = await UserActivity.findAll()
    return res.json({ allData })
  }

  async generalReport(req: Request, res: Response, next: NextFunction) {
    const allRegisteredUsersCount = await User.count({ where: { role: 'Student' } })
    const activeUsersCount = await User.count({
      where: {
        lastSeen: { [Op.gte]: moment().subtract(14, 'days').toDate() },
        role: 'Student',
      },
    })
    const usersGroupedByGender = await sequelize.query(`SELECT gender, count(*) as COUNT FROM public."Users" GROUP BY gender`, { type: QueryTypes.SELECT })
    const usersGroupedByAge = await sequelize.query(
      `SELECT DATE_PART('Year', NOW())-"birthYear" as Age, count(*) as COUNT 
            FROM public."Users" 
            GROUP BY DATE_PART('Year', NOW())-"birthYear"
            ORDER BY DATE_PART('Year', NOW())-"birthYear"`, { type: QueryTypes.SELECT })

    return res.json({
      accountsData: { allRegisteredUsersCount, activeUsersCount },
      usersData: { usersGroupedByGender, usersGroupedByAge },
    })
  }
}

export default new StatisticsController()