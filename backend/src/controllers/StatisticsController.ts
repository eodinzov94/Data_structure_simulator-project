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
    const usersGroupedByGender = await sequelize.query<{ gender: string, count: string }>
    (`SELECT gender, count(*) as COUNT FROM public."Users" GROUP BY gender`, { type: QueryTypes.SELECT })
    const usersGroupedByAge = await sequelize.query<{ age: number, count: string }>(
      `SELECT DATE_PART('Year', NOW())-"birthYear" as Age, count(*) as count 
            FROM public."Users" 
            GROUP BY DATE_PART('Year', NOW())-"birthYear"
            ORDER BY DATE_PART('Year', NOW())-"birthYear"`, { type: QueryTypes.SELECT })

    return res.json({
      accountsData: [
        { key: 'Registered users', value: allRegisteredUsersCount },
        { key: 'Logged in (last two weeks)', value: activeUsersCount },
      ],
      usersData: {
        usersGroupedByGender: usersGroupedByGender.map(user => ({ key: user.gender, value: Number(user.count) })),
        usersGroupedByAge: usersGroupedByAge.map(user => ({ key: user.age.toString(), value: Number(user.count) })),
      },
    })
  }
}


export default new StatisticsController()