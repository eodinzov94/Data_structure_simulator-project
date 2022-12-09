import {NextFunction, Request, Response} from "express";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

const AuthMW = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const decoded = verify(token, process.env.JWT_SECRET_KEY as string)
        // @ts-ignore
        req.user = decoded
        next()
    } catch (e) {
        console.log(e);
        res.status(401).json({message: "Unauthorized ERR"})
    }
};
export default AuthMW