import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import commentDTO from "./comment.vallidator";
import commentCtl from "./comment.controller";

const commentRouer = Router()

commentRouer.post('/create/:postId', allowUsers(), bodyValidator(commentDTO), commentCtl.createCommentForPost);
commentRouer.get('/comments/post/:postId', commentCtl.getCommentsByPostId);
commentRouer.put('/update/:commentId', allowUsers(), bodyValidator(commentDTO), commentCtl.updateComment);
export default commentRouer;