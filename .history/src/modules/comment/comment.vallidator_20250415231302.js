import joi from "joi"

const commentDTO = joi.object({
    post:joi.string.rw
    content: joi.string().trim().required(),
})
export default commentDTO;