import joi from "joi"

const commentSchema = joi.object({
    content: Joi.string().trim().required(),
})