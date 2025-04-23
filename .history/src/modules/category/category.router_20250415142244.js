import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants";

const categoryRouter = Router()

categoryRouter.post('/',allowUsers(userRoles.ADMIN),uploader())