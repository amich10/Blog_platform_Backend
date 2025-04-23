import joi from "joi"

const commentDTO = joi.object({
    post
    content: joi.string().trim().required(),
})
export default commentDTO;