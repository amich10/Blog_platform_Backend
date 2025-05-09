import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js"
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import postCtrl from "./posts.controller.js";
import {postDTO, updatePostDTO} from "./posts.vallidator.js"

const postRouter = Router()

postRouter.post('/create',allowUsers(),uploader().array('image'),bodyValidator(postDTO),postCtrl.storePost);
postRouter.get('/all',allowUsers(),postCtrl.showAllpost)

postRouter.get('/:slug',allowUsers(),postCtrl.getpostDetailBySlug)

postRouter.get('/all/published-posts',allowUsers(),postCtrl.getPublishedposts)


postRouter.patch('/update/:id',allowUsers([userRoles.ADMIN,userRoles.AUTHOR]),uploader().array('image'),bodyValidator(updatePostDTO),postCtrl.updatepostById)
postRouter.delete('/delete/:id',allowUsers([userRoles.ADMIN,userRoles.AUTHOR]),postCtrl.deleteCatgoryById)
postRouter.patch('/like/:slug', allowUsers(), postCtrl.likePost);
postRouter.patch('/view/:slug', allowUsers(), postCtrl.incrementViews);
postRouter.



export default postRouter;