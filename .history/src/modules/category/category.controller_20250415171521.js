
import { userStatus } from "../../config/constants.js";
import categorySvc from "./category.service.js";

class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            let payload = await categorySvc.transformCreateCategory(req)
            let data = await categorySvc.create(payload)

            res.json({
                data:data,
                message:"Category created Successfuly",
                status:"CATEGORY_CREATED",
                options:null

            })

        } catch (exception) {
            next(exception)
        }
    }
    showAllCategory = async(req,res,next) =>{
        try {
            //search
            let filter ={}
            if(req.query.search){
                const searchRegex = new RegExp(req.query.search,'i')
                filter = { 
                    $or: [
                        { title: searchRegex },
                        { slug: searchRegex }
                    ]
                }
            }
            // console.log("FILTER APPLIED:", filter)
            

            const {data, pagination} = await categorySvc.listAllCategory({query:req.query,filter}
            )
            res.json({
                data:data,
                message:"All categories listed",
                status:"CATEGORY_LISTED",
                options:{...pagination}
            })

        } catch (exception) {
            next(exception)
        }
    }
    getCategoryDetailById = async(req,res,next) =>{
        try {
            const categoryId = req.params.id;
            const category = await categorySvc.getSingleRow({
                _id:categoryId
            })
            if(!category){
                next({
                    data:null,
                    message:`Catgeory with id ${categoryId} not found`,
                    status:"CATGORY_NOT_FOUND",
                    options:null
                })
            }
            res.json({
                data:category,
                message:"A single category detail",
                status:"CATEGORY_DETAIL",
                options:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    getPublishedCategories = async(req,res,next) =>{
        try {
            const filter = {
                status: userStatus.ACTIVE
            }
            if (req.query.search) {
                const searchRegex = new RegExp(req.query.search, 'i');
                filter.$or = [
                    { title: searchRegex },
                    { slug: searchRegex }
                ];
            }
            const {data,pagination} = await categorySvc.listAllCategory({filter,query:req.query})
            res.json({
                data:data,
                message:"All the active/published categories",
                status:"ACTIVE_CATEGORIES",
                options:{...pagination}
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    
}

const categoryCtrl = new CategoryControl()
export default categoryCtrl