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

            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const skip = (page-1)*limit

            let sort = {title:'asc'}  //default
            if(req.query.sort) { //sort_desc
                const [column_name,direction] = req.query.sort.split('_') //converts sort_des into ['sort','desc']
                sort = {[column_name]: direction}
            }

            const data = await CategoryModel.find(filter)
            .sort(sort)
            .limit(limit)
            .skip(skip)

            const countTotal = await user.countDocuments(filter)

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
            
            let userID = req.params.id;


        } catch (exception) {
            
        }
    }
}

const userCtrl  = new UserController()
export default userCtrl