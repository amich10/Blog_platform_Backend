import { Router } from "express";
import allowUser from "../auth/"

const categoryRouter = Router()

categoryRouter.post('/',allowUser())