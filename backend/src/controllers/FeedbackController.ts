import { NextFunction, Request, Response } from 'express'
import Feedback from '../models/Feedback.js'
import { FeedBackInput } from '../types/FeedbackTypes.js'
import { Op } from 'sequelize'
import ApiError from '../error/ApiError.js'

class FeedBackController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const allData = await Feedback.findAll()
    return res.json({ allData })
  }

  async create(req: Request<FeedBackInput>, res: Response, next: NextFunction) {
    const { subject, contactInfo, message } = req.body
    await Feedback.create({ subject, contactInfo: contactInfo ? contactInfo : '', message })
    return res.json({ status: 'OK'})
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { idList } = req.body
    if (!idList) {
      return next(ApiError.badRequest('idList is required'))
    }
    const deleted = await Feedback.destroy({
      where: {
        id: {
          [Op.in]: idList
        }
      }
    })
    return res.json({ deleted })
  }
}

export default new FeedBackController()
