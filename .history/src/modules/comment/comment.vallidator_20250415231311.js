import joi from "joi"

const commentDTO = joi.object({
    post:joi.string.required(),
    commenter:
    content: joi.string().trim().required(),
})
export default commentDTO;