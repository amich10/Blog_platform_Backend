import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { categoryDTO } from "./category.vallidator.js";
import authCtrl from "../auth/auth.controller.js";
const categoryRouter = Router()

categoryRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(categoryDTO),)


export default categoryRouter;