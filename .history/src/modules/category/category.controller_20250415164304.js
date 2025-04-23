
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
            const id = 
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtrl = new CategoryControl()
export default categoryCtrl