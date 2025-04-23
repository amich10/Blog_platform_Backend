import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    title:{
        type:string,
        min:
    }
})

const CategoryModel = mongoose.model(categorySchema)

export default CategoryModel;