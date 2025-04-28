import joi from "joi"
import { date, required } from 'joi/lib/types/date';

const { date, required } = joi;


export const commentDTO = joi.object({
    postId:joi.string().required(),
    content: joi.string().trim().required(),
})