class CategoryControl {
    storeCategory = (req,res,next) =>{
        try {
            
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril