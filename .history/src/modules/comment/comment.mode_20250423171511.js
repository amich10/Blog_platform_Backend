import { date, required } from "joi";
import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"Post",
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const CommentModel = mongoose.model('Comment',comentSchema)
export default CommentModel;