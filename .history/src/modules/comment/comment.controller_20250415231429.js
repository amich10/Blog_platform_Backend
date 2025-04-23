class commentControl {
    createComment  = async (req,res,next) =>{
        try {
            const data =req.body;
            
        } catch (exception) {
            next(exception)
        }
    }
}
const commentCtl = new commentControl()
export default commentCtl;