import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";

const commentRouer = Router()

commentRouer.post('/create',allowUsers(),bodyValidator())
export default commentRouer;