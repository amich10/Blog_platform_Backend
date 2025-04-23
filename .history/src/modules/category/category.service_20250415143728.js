import BaseService from "../../services/base.service";

class CategoryService extends BaseService{
    constructor(){
        super(categoryModel)
    }

    transformCreateCategory = async(data) =>{
        try {
            let payload = data.payload
        } catch (exception) {
            
        }
    }
}

const categorySvc = new CategoryService()
export default categorySvc;