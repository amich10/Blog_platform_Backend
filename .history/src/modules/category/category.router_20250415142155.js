import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js"

const categoryRouter = Router()

categoryRouter.post('/',allowUser())