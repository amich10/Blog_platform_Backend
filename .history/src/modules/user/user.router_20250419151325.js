import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { userRoles } from "../../config/constants";
import { uploader } from "../../middleware/file_handling.middleware";

const userRouter = Router()

userRouter.post('/create',allowUsers(userRoles.ADMIN),uploader())

export default userRouter;