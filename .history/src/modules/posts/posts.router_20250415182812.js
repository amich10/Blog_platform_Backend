import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { postDTO, updatepostDTO } from "./posts.vallidator.js";
import postCtrl from "./post.controller.js";

const postRouter = Router()

postRouter.post('/',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(postDTO),postCtrl.storepost);
  
postRouter.get('/all',allowUsers(),postCtrl.showAllpost)
postRouter.get('/:id',allowUsers(),postCtrl.getpostDetailById)
postRouter.get('/all/published-posts',allowUsers(),postCtrl.getPublishedposts)
postRouter.patch('/update/:id',allowUsers(userRoles.ADMIN),uploader().single('image'),bodyValidator(updatepostDTO),postCtrl.updatepostById)
postRouter.delete('/delete/:id',allowUsers(userRoles.ADMIN),postCtrl.deleteCatgoryById)


export default postRouter;