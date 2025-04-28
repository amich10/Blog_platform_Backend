import Joi from "joi";
import mongoose from "mongoose";

const commentDTO = Joi.object({
    postId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid postId format");
        }
        return value;
    }).required(),
    content: Joi.string().trim().required(),
});

export default commentDTO;
