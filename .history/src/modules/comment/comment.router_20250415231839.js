import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import commentDTO from "./comment.vallidator";
import commentCtl from "./comment.controller";

const commentRouer = Router()

commentRouer.post('/create',allowUsers(),bodyValidator(commentDTO),commentCtl.createComment)
commentRouer.get()
export default commentRouer;