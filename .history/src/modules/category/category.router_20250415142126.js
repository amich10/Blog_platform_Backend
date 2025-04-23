import { Router } from "express";
import allowUser from ""

const categoryRouter = Router()

categoryRouter.post('/',allowUser())