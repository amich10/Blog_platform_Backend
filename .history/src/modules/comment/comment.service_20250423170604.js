import BaseService from "../../services/base.service.js";
import CommentModel from "./comment.mode.js";


class CommentService extends BaseService{
    constructor(){
        super(CommentModel)
    }

}
const commentSvc = new CommentService()
export default commentSvc;