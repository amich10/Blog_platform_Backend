import joi from "@hapi/joi"
import joi from '@hapi/joi';  // Default import
const { date, required } = joi;  // Destructure after


export const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})