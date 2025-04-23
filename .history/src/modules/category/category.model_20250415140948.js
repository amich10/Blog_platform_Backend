import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    title:{
        type:string,
        min:3,
        
        max:20,
    }
})

const CategoryModel = mongoose.model(categorySchema)

export default CategoryModel;