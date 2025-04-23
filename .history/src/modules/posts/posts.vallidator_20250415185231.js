import joi from "joi"
import { userStatus } from "../../config/constants.js"

export const PostDTO = joi.object({
    title: joi.string().required().trim().max(150).messages({}),
    content: joi.string().required().messages(),
    excerpt: joi.string().trim().max(300).optional().allow(''),
    tags: joi.array().items(joi.string()
      .trim()
      .lowercase()
  )
  .optional()
    :joi.string().regex(/^(active|inactive)$/).default(''),

})

export const updatePostDTO = joi.object({
    title:joi.string().min(3).max(20).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^active|inactive$/).default(userStatus.INACTIVE),
    image:joi.string().allow(null,'').optional().default(null)
})