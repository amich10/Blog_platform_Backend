import mongoose from "mongoose";
import { userStatus } from "../../config/constants.js";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
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

const PostModel = mongoose.model('Post',PostSchema)

export default PostModel;