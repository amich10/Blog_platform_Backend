import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import commentDTO from "./comment.vallidator.js";
import commentCtl from "./comment.controller.js";

const commentRouer = Router();

commentRouer.post('/create/:postId', allowUsers(), bodyValidator(commentDTO), commentCtl.createCommentForPost);
commentRouer.get('/comments/post/:postId', commentCtl.getCommentsByPostId);
commentRouer.put('/update/:commentId', allowUsers(), bodyValidator(commentDTO), commentCtl.updateComment);
commentRouer.delete('/delete/:commentId', allowUsers(), commentCtl.deleteComment); 

export default commentRouer;