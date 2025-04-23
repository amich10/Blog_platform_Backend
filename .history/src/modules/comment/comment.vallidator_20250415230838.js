import joi from "joi"

const commentDTO = joi.object({
    content: Joi.string().trim().required(),
})
