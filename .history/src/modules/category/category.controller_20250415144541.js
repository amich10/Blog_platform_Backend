import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services";

class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'/Category')
            if(payload.parentId===null || payload.parentId===''|| !payload.parentId){
                payload.parentId=null
            }
            payload.createdBy=req.authUser._id
            
            let slug = payload.title.replace(/['"]/g, ''); //removes ' and " from the string
            payload.slug = slugify(slug)
            
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril