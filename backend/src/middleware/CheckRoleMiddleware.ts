import {NextFunction, Request, Response} from "express";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

const CheckRoleMW = (role:string) => {
    return function (req:Request<any>, res:Response, next:NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Bearer
            if (!token) {
                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = verify(token, process.env.JWT_SECRET_KEY as string )
            // @ts-ignore
            if (decoded.role !== role) {
                return res.status(403).json({message: "Access Denied"})
            }
            // @ts-ignore
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Unauthorized"})
        }
    };
}
export default CheckRoleMW