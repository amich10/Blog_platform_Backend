import mongoose from "mongoose";
import { userStatus } from "../../config/constants.js";


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
        },
        optimizedUrl:{
            type:String,
            default:""
        }
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
}
)

const CategoryModel = mongoose.model('Category',categorySchema)

export default CategoryModel;