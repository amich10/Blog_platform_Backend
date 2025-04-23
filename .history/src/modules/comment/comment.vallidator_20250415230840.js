import joi from "joi"

const commentDTO = joi.object({
    content: joi.string().trim().required(),
})
