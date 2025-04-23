
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

    getAllUsers = async(req,res,next) =>{
        try {
            let filter={}

            if(req.query.search){
                const searchRegex = new RegExp(req.query.search,'i')
                filter = {username : searchRegex}
            }

            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const skip = (page-1)*limit

            let sort = {username:'asc'} 
            if(req.query.sort) {
                const [column_name,direction] = req.query.sort.split('_') //converts sort_des into ['sort','desc']
               if(['asc','desc'].includes(direction)){
                sort = {[column_name]:direction}
               }
            }

            const data = await UserModel.find(filter)
            .limit(limit)
            .skip(skip)
            .sort(sort)

            const countTotal = await UserModel.countDocuments(filter)

            res.json({
                data:data,
                message:"All user list",
                status:'USER_LIST',
                options:{
                    pagination:{
                        page:page,
                        limit:limit,
                        total:countTotal
                    }
                }
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }

    updateUser = async(req,res,next) =>{
        try {
            
            let userId = req.params.id;

            const user = await userSvc.getSingleRow({
                _id:userId
            })

            if(!user){
                res.json({
                    code:404,
                    message:"User does not exist",
                    status:"USER_NOT_FOUND",
                    options:null
                })
            }

            let payload = req.body;
            const updatedData = await userSvc.updateRowByFilter({
                _id:userId
            },payload)

            res.json({
                message:"User details updated",
                status:"USER_UPDATED"
            })
        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl