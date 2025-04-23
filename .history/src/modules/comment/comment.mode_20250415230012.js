import { required } from "joi";
import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    userId :{
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
        ty
    }
})