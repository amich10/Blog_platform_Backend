import cloudinarySvc from "../../services/cloudinary.services.js";
import UserModel from "./user.model.js";
import userSvc from "./user.service.js";
import bcrypt from "bcryptjs";
class UserController {
    createUser = async(req,res,next) =>{
        try {
            
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'users/')
           payload.password = bcrypt.hashSync(payload.password, 12)

            const data = await userSvc.create(payload)
            res.json({
                data: data,
                message:"User created successfully",
                status:"USER_CREATED",
                options:null
            })
        } catch (exception) {
            console.log(exception)
            next(exception)            
        }
    }

   C

    updateUser = async(req,res,next) =>{
        try {
            
            let userID = req.params.id;


        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl