import joi from "joi"

const commentDTO = joi.object({
    postId:joi.string().required(),
    userId:joi.string().required(),
    content: joi.string().trim().required(),
})
export default commentDTO;