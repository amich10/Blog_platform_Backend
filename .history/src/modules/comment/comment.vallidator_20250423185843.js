import joi from "joi"

export const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})

export const commentUpdateDTO = joi.object({
    content: joi.string().trim().required(),
})

