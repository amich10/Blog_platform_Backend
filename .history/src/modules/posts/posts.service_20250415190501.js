import BaseService from "../../services/base.service.js";
import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services.js";
import postModel from "./posts.model.js";

class postService extends BaseService{
    constructor(){
        super(postModel)
    }

    transformCreatepost = async(req) =>{
        try {
            let payload = req.body;
            let slug = payload.title.replace(/['"]/g, ''); //removes ' and " from the string
            payload.slug = slugify(slug)


            if(payload.categoryId === null || payload.categoryId==='' || !payload.categoryId){
                payload.categoryId=null
            }
            payload.authorId = req.authUser._id;

            payload.image = await cloudinarySvc.fileUpload(req.file.path,'/post')
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
    listAllpost = async({query,filter={}}) =>{
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

            //get posts
            const data = await postModel.find(filter)
            .populate('parentId',['_id','title','slug','status','image'])
            .populate('createdBy',['_id','username','email','status','role'])
            .sort(sort)
            .limit(limit)
            .skip(skip)

            const countTotal = await postModel.countDocuments(filter)

            return {
                data:data,
                pagination:{
                    page:page,
                    limit:limit,
                    total:countTotal
                }
            }
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    transformUpdatepost = async(req,oldData) => {
        try {
            let payload = req.body;
            if(payload.parentId ===null || payload.parentId ==='' || !payload.parentId){
                payload.parentId=null
            }
            if(req.file){
                payload.image = await cloudinarySvc.fileUpload(req.file.path,'post')
            }else{
                payload.image = oldData.image
            }
            payload.slug = slugify(payload.title)
            payload.updatedBy = req.authUser._id

            return payload;
        } catch (exception) {
            throw exception
        }
    }
}

const postSvc = new postService()
export default postSvc;