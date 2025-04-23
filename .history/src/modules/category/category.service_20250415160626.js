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
    listAllCategory = async({query,filter={}}) =>{
        try {
           //pagination
            const page = +query.page || 1;
            const limit = +query.limit || 10;
            const skip = (page-1)*limit

            //sorting
            let sort = {title:'asc'}  //default
            if(query.sort) { //sort_desc
                const [column_name,direction] = query.sort.split('_') //converts sort_des into ['sort','desc']
                sort = {[column_name]: direction}
            }

            //get categories
            const data = await CategoryModel.find(filter)
            .populate('parentId',['_id','title','slug','status','image'])
            .populate('createdBy',['_id','username','email','status','role'])
            .sort(sort)
            .limit(limit)
            .skip(skip)

            const countTotal = await CategoryModel.countDocuments(filter)

            return {
                data:data,
                pagination:{
                    page:page,
                    limit:limit,
                    
                }
            }
        } catch (exception) {
            throw exception
        }
    }
}

const categorySvc = new CategoryService()
export default categorySvc;