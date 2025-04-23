import BaseService from "../../services/base.service";

class CategoryService extends BaseService{
    constructor(){
        super(categoryModel)
    }

    transformCreateCategory = async(req) =>{
        try {
            let payload = req.body
        } catch (exception) {
            
        }
    }
}

const categorySvc = new CategoryService()
export default categorySvc;