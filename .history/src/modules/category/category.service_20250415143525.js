import BaseService from "../../services/base.service";

class CategoryService extends BaseService{
    constructor(){
        super(categoryModel)
    }
}

const categorySvc = new CategoryService()
export default categorySvc;