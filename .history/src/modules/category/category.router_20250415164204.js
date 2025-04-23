import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { categoryDTO } from "./category.vallidator.js";
import categoryCtrl from "./category.controller.js";

const categoryRouter = Router()

categoryRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(categoryDTO),categoryCtrl.storeCategory)
categoryRouter.get('/all',allowUsers(),categoryCtrl.showAllCategory)
categoryRouter.get('/:id',allowUsers(),)


export default categoryRouter;