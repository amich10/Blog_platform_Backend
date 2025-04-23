import cloudinarySvc from "../../services/cloudinary.services.js";
import userSvc from "./user.service.js";

class UserController {
    createUser = async(req,res,next) =>{
        try {
            
            let payload = req.body;

            if(payload.image){
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'users/')
            } else{
                payload.image=null
            }
           data.password = bcrypt.hashSync(data.password, 12)

            const data = await userSvc.create(payload)
            res.json({
                data: data,
                message:"User created successfully",
                status:"USER_CREATED",
                options:null
            })
        } catch (exception) {
            console.log(ex)
            next(exception)            
        }
    }

    getAllUsers = async(req,res,next) =>{
        try {
            
        } catch (exception) {
            
        }
    }

    updateUser = async(req,res,next) =>{
        try {
            
            let userID = req.params.id;


        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl