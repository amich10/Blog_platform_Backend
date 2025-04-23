import cloudinarySvc from "../../services/cloudinary.services.js";
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

    getAllUsers = async(req,res,next) =>{
        try {
            let filter={}

            if(req.query.search){
                const searchRegex = new RegExp(req.query.search,'i')
                filter = {username : searchRegex}
            }


            const page = +query.page || 1;
            const limit = +query.limit || 10;
            const skip = (page-1)*limit

            let sort = {title:'asc'}  //default
            if(query.sort) { //sort_desc
                const [column_name,direction] = query.sort.split('_') //converts sort_des into ['sort','desc']
                sort = {[column_name]: direction}
            }




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