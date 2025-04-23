import cloudinarySvc from "../../services/cloudinary.services";
import userSvc from "./user.service";

class UserController {
    createUser = async(req,res,next) =>{
        try {
            
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'users/')
            payload.password = bcrypt.hashSync(payload.password,12)

            await userSvc.

        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl