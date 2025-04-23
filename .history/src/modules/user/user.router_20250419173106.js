import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import userCtrl from "./user.controller.js";
import { userDTO } from "./user.vallidator.js";

const userRouter = Router()

userRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(userDTO),userCtrl.createUser)
userRouter.get('/all',allowUsers(userRoles.ADMIN),userCtrl.getAllUsers)
userRouter.get('/:id',allowUsers(userRoles.ADMIN),userCtrl.getUserById)
userRouter.patch('/:id',allowUsers(userRoles.ADMIN),userCtrl.updateUserById)
userRouter.delete('/:id',)
export default userRouter;