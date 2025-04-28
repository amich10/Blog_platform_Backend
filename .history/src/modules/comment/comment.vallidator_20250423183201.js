import joi from "@hapi/joi"

export const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})