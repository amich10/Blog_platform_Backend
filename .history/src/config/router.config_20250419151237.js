import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'
import categoryRouter from "../modules/category/category.router.js";
import postRouter from "../modules/posts/posts.router.js";
import commentRouer from "../modules/comment/comment.router.js";
import userRouter from "../modules/user/user.router.js";

const router = Router()

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/post',postRouter)
router.use('/comment',commentRouer)
router.use('/user',userRouter)

export default router;


