import {Router} from 'express'
import UserController from "../controllers/UserController.js";



const router =  Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/test',(req,res)=>{
    res.json("Works")
})
export default router