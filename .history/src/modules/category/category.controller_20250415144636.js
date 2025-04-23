import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services";

class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril