import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
const categoryRouter = Router()

categoryRouter.post('/',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyVall)