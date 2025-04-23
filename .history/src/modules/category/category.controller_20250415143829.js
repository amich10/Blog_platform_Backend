import cloudinarySvc from "../../services/cloudinary.services";

class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path)
            
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril