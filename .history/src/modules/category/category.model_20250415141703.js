import mongoose from "mongoose";
import { userStatus } from "../../config/constants";


const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        min:3,
        max:20,
        unique:true,
        required:true,
        trim:true //removes any unnecessary spaces
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    parentId:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        default:null
    },
    status:{
        type:String,
        enum:Object.values(userStatus),
        default:userStatus.INACTIVE
    },
    image:{
        url:{
            type:String,
            default:""
        }
    }
})

const CategoryModel = mongoose.model(categorySchema)

export default CategoryModel;