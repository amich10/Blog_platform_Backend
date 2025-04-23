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

            const data = await userSvc.create(payload)
            res.json({
                data: data,
                message:"User created successfully",
                status:"u"
            })
        } catch (exception) {
            next(exception)            
        }
    }

    getAllUsers = async(req,res,next) =>{
        try {
            await userSvc.
        } catch (exception) {
            
        }
    }

    updateUser = async(req,res,next) =>{
        try {
            
            let userID = req.params.id;

            if

            let payload = req.body;

        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl