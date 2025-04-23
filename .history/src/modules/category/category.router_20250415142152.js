import { Router } from "express";
import allowUser from "../../middleware/auth.middleware"

const categoryRouter = Router()

categoryRouter.post('/',allowUser())