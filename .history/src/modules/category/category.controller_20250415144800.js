import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services";
import categorySvc from "./category.service";

class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            let payload = await categorySvc.transformCreateCategory(req)
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril