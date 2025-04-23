import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import commentDTO from "./comment.vallidator";

const commentRouer = Router()

commentRouer.post('/create',allowUsers(),bodyValidator(commentDTO),)
export default commentRouer;