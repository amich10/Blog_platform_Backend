
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
                filter = {searchRegex}
            }

            const {data, pagination} = await categorySvc.listAllCategory({filter, ...req.query})

        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtrl = new CategoryControl()
export default categoryCtrl