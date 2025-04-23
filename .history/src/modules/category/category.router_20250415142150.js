import { Router } from "express";
import allowUser from "../../middleware/"

const categoryRouter = Router()

categoryRouter.post('/',allowUser())