import { Router } from "express";
import authCtrl from "./auth.controller.js";
import { forgetPasswordDTO, resetPasswordDTO, userLoginDTO, userRegisterDTO } from "./auth.vallidator.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import allowUsers from "../../middleware/auth.middleware.js";


const authRouter = Router()

authRouter.post('/register',uploader().single('image'), bodyValidator(userRegisterDTO), authCtrl.registerUser)
authRouter.get('/activate/:token',authCtrl.activateUser)
authRouter.post('/login',bodyValidator(userLoginDTO),authCtrl.loginUser)
authRouter.get('/me',allowUsers(),authCtrl.getUserProfile)
authRouter.post('/forget-password',bodyValidator(forgetPasswordDTO),authCtrl.forgetPassword)
authRouter.get('/verify-token/:token',authCtrl.verifyForgetPasswordToken)
authRouter.patch('/password-reset/',bodyValidator(resetPasswordDTO),authCtrl.resetPassword)


export default authRouter;