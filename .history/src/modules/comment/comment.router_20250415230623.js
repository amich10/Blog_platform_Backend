import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware";

const commentRouer = Router()

commentRouer.post('/create',allowUsers(),)
export default commentRouer;