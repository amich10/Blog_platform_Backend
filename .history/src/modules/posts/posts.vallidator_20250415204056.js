import joi from "joi"
import { postStatus } from "../../config/constants.js"

export const postDTO = joi.object({
    title: joi.string().required().trim().max(150).messages({}),
    content: joi.string().required().messages(),
    excerpt: joi.string().trim().max(300).optional().allow(''),
    tags: joi.array().items(joi.string().trim().lowercase()).optional(),
    categoryId:joi.string().allow(null,'').default(null).optional(),
    authorId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^published|unpublished$/).default(postStatus.UNPUBLISHED)
})

export const updatePostDTO = joi.object({
    title: joi.string().required().trim().max(150).messages({}),
    content: joi.string().required().messages(),
    excerpt: joi.string().trim().max(300).optional().allow(''),
    tags: joi.array().items(joi.string().trim().lowercase()).optional(),
    categoryId:joi.string().allow(null,'').default(null).optional(),
    authorId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^published|unpublished$/).default(postStatus.UNPUBLISHED)
    image:Joi.array().items(
        Joi.object({
          url: Joi.string().uri().required(),
          optimizedUrl: Joi.string().uri().required()
        })
      );
})