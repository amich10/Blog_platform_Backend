import joi from "joi"
import { userStatus } from "../../config/constants"

export const categoryDTO = joi.object({
    title:joi.string().min(3).max(20).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^active|inactive$/).default(userStatus.INACTIVE)
})

export const updateCategoryDTO = joi.object({
    title:joi.string().min(3).max(20).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^active|inactive$/).default(userStatus.INACTIVE),
    image:joi.string().allow(null,'').optional().default(null)
})