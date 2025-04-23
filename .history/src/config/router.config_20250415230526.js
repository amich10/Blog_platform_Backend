import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'
import categoryRouter from "../modules/category/category.router.js";
import postRouter from "../modules/posts/posts.router.js";

const router = Router()

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/post',postRouter)
router.use('/comment',commentRO)

export default router;


