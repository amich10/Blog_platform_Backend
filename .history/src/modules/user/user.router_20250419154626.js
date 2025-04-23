import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants";
import { uploader } from "../../middleware/file_handling.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import userCtrl from "./user.controller";
import { userDTO } from "./user.vallidator";

const userRouter = Router()

userRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(userDTO),userCtrl.createUser)

export default userRouter;