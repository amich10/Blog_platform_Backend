import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'

const router = Router()

router.use('/auth',authRouter)
router.use('/category',cate)

export default router;


