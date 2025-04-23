import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { userRoles } from "../../config/constants";

const userRouter = Router()

userRouter.post('/create',allowUsers(userRoles.ADMIN),UPL)

export default userRouter;