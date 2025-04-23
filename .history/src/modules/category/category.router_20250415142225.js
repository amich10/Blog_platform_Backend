import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"

const categoryRouter = Router()

categoryRouter.post('/',allowUsers())