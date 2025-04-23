import joi from "joi"

const categoryDTO = joi.object({
    title:joi.string().min
})