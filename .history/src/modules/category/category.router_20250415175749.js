import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { categoryDTO, updateCategoryDTO } from "./category.vallidator.js";
import categoryCtrl from "./category.controller.js";

const categoryRouter = Router()

categoryRouter.post('/create',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(categoryDTO),categoryCtrl.storeCategory)
categoryRouter.get('/all',allowUsers(),categoryCtrl.showAllCategory)
categoryRouter.get('/:id',allowUsers(),categoryCtrl.getCategoryDetailById)
categoryRouter.get('/all/published-categories',allowUsers(),categoryCtrl.getPublishedCategories)
categoryRouter.patch('/update/:id',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(updateCategoryDTO),categoryCtrl.updateCategoryById)4
categoryRouter.delete('/delete/:id',allowUsers(userRoles.ADMIN),categoryCtrl.delete)


export default categoryRouter;