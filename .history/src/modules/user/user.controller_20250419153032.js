import cloudinarySvc from "../../services/cloudinary.services";
import userSvc from "./user.service";

class UserController {
    createUser = async(req,res,next) =>{
        try {
            
            let payload = req.body;

            if(payload.image){
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'users/')
            } else{
                payload.image=null
            }
            payload.password = bcrypt.hashSync(payload.password,12)

            await userSvc.create(payload)

        } catch (exception) {
            next(exception)            
        }
    }
    updateUser = async(req,res,next) =>{
        try {
            
            let 

            let payload = req.body;

        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl