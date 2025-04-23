import joi from "joi"

const categoryDTO = joi.object({
    title:joi.string().min(3).max(20).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^active|inactive$/).default
})