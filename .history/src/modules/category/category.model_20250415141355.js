import mongoose from "mongoose";


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
    
})

const CategoryModel = mongoose.model(categorySchema)

export default CategoryModel;