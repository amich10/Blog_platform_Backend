class CategoryControl {
    storeCategory = async(req,res,next) =>{
        try {
            let payload = req.body;
            payload.image = await au
            
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtril = new CategoryControl()
export default categoryCtril