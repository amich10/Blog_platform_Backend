import BaseService from "../../services/base.service.js";


class CommentService extends BaseService{
    constructor(){
        super(Comment)
    }

}
const commentSvc = new CommentService()
export default commentSvc;