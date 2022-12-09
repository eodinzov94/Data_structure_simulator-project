import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken'


const AuthMW = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        // @ts-ignore
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Unauthorized"})
    }
};
export default AuthMW