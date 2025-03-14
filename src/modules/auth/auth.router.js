import { Router } from "express";
import authCtrl from "./auth.controller.js";
import { userRegisterDTO } from "./auth.vallidator.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { uploader } from "../../middleware/file_handling.middleware.js";


const authRouter = Router()

authRouter.post('/register',uploader().single('image'), bodyValidator(userRegisterDTO), authCtrl.registerUser)
authRouter.get('/activate/:token',authCtrl.activateUser)
authRouter.post('/login',authCtrl.loginUser)
authRouter.get('/me',authCtrl.getUserProfile)
authRouter.post('/forget-password',authCtrl.forgetPassword)
authRouter.patch('/password-reset/:token',authCtrl.resetPassword)


export default authRouter;