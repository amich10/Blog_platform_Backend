import Joi from "@hapi/joi";

export const commentDTO = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().trim().required(),
});