import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
        
    }
})