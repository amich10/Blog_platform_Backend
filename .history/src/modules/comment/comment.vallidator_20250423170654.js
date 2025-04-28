import joi from "joi";

const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})
export default commentDTO;