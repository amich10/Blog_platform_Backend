import joi from "joi"

const commentDTO = joi.object({
    post:joi.string.required(),
    commenter:joi.string().required(),
    content: joi.string().trim().required(),
})
export default commentDTO;