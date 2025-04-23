import BaseService from "../../services/base.service.js";
import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services.js";
import CategoryModel from "./category.model.js";

class CategoryService extends BaseService{
    constructor(){
        super(CategoryModel)
    }

    transformCreateCategory = async(req) =>{
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'/Category')
            if(payload.parentId===null || payload.parentId===''|| !payload.parentId){
                payload.parentId=null
            }
            payload.createdBy=req.authUser._id
            
            let slug = payload.title.replace(/['"]/g, ''); //removes ' and " from the string
            payload.slug = slugify(slug)
            
            return payload

        } catch (exception) {
            throw exception
        }
    }
    listAllCategory = async(Query,filter={}) =>{
        try {
            //search
            let filter ={}
            if(req.query.search){
                const searchRegex = new RegExp(req.query.search,'i')
                filter = {searchRegex}
            }

            
        } catch (exception) {
            throw exception
        }
    }
}

const categorySvc = new CategoryService()
export default categorySvc;