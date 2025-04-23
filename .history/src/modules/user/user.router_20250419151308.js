import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";

const userRouter = Router()

userRouter.post('/create',allowUsers(User))

export default userRouter;