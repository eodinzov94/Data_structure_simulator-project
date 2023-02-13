import { NextFunction, Response } from 'express'
import pkg from 'jsonwebtoken'
import { RequestWithUser } from '../types/RequestType.js'
import { IUser } from '../types/UserTypes.js'

const { verify } = pkg

const AuthMW = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // Bearer
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as IUser
    req.user = decoded
    next()
  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Unauthorized' })
  }
}
export default AuthMW