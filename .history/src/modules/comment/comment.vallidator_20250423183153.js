import joi from "@hapi/joi"
import joi from '@hapi/joi';  // Default import
// Removed unused destructured elements


export const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})