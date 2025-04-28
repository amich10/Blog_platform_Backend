import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";

import commentCtl from "./comment.controller.js";
import { commentDTO } from "./comment.vallidator.js";

const commentRouter = Router();

commentRouter.post('/create', allowUsers(), bodyValidator(commentDTO), commentCtl.createComment);
commentRouter.get('/post/:postId', commentCtl.getCommentsByPostId);
commentRouter.patch('/post/:commentId', allowUsers(), bodyValidator(commentDTO), commentCtl.updateComment);
commentRouter.delete('/delete/:commentId', allowUsers(), commentCtl.deleteComment); 

export default commentRouter;