import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";

import commentCtl from "./comment.controller.js";
import { commentDTO, commentUpdateDTO } from "./comment.vallidator.js";

const commentRouer = Router();

commentRouer.post('/create', allowUsers(), bodyValidator(commentDTO), commentCtl.createComment);
commentRouer.get('/post/:postId', commentCtl.getCommentsByPostId);
commentRouer.patch('/post/:commentId', allowUsers(), bodyValidator(commentUpdateDTO), commentCtl.updateComment);
commentRouer.delete('/post/:commentId', allowUsers(), commentCtl.deleteComment); 
ommentRouter.get('/post/commentCount/:slug',allowUsers(), commentCtl.getTotalCommentCount);


export default commentRouer;