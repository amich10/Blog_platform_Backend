import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { userRoles } from "../../config/constants";
import { uploader } from "../../middleware/file_handling.middleware";
import { bodyValidator } from "../../middleware/request.validator";

const userRouter = Router()

userRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(userDTO),u)

export default userRouter;