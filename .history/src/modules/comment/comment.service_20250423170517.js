import BaseService from "../../services/base.service.js";
import CommentModel from "./comment.model.js"; // Adjust the path as needed

class CommentService extends BaseService{
    constructor(){
        super(CommentModel)
    }

}
const commentSvc = new CommentService()
export default commentSvc;