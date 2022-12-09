import ApiError from "../error/ApiError.js";
import bcrypt from 'bcrypt'
import User from "../models/User.js";
import {IUser, IUserLogin, IUserRegister} from "../types/UserTypes.js";
import {NextFunction, Response} from "express";
import {TypedRequestBody} from "../types/RequestType.js";
import validator from "validator";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateJwt = (user:IUser) => {
    return sign(
        {
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            gender:user.gender,
            age:user.age,
            role:user.role
        },
        process.env.JWT_SECRET_KEY!,
        {expiresIn: '48h'}
    )
}





class UserController {
    async registration(req:TypedRequestBody<IUserRegister>, res:Response, next:NextFunction) {
        const {email,age,gender,lastName,firstName, password, role} = req.body
        if (!validator.default.isEmail(email)) {
            return next(ApiError.badRequest('Incorrect email'))
        }
        if (!password || password.length < 8) {
            return next(ApiError.badRequest('Password should be at least 8 char length'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with current email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        try{
            const user = await User.create({email,age,gender,lastName,firstName, role, password: hashPassword})
            const token = generateJwt(user)
            return res.json({token})
        }catch (e:any){
            return res.json(ApiError.badRequest(e?.errors[0]?.message ||'Input error'))
        }

    }

    async login(req:TypedRequestBody<IUserLogin>, res:Response, next:NextFunction) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Incorrect email or password'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect email or password'))
        }
        const token = generateJwt(user)
        return res.json({token})
    }


}

export default new UserController()