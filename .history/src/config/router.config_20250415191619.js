import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'
import categoryRouter from "../modules/category/category.router.js";

const router = Router()

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/post',)

export default router;


