import Joi from "joi";
import { genderTypes, userRoles, userStatus } from "../../config/constants.js";

export const userDTO = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  username: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string()
    .valid(genderTypes.MALE, genderTypes.FEMALE, genderTypes.OTHER)
    .optional(),
  role: Joi.string()
    .valid(userRoles.ADMIN, userRoles.AUTHOR, userRoles.USER)
    .default(userRoles.USER),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  bio: Joi.string().max(500).allow("").optional(),
  socialMedia: Joi.string().uri().messages().optional(),
  status: Joi.string()
    .valid(userStatus.INACTIVE, userStatus.ACTIVE)
    .default(userStatus.INACTIVE),
   image: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().optional(),
        optimizedUrl: Joi.string().uri().optional(),
      })
    )
    .optional(),
});


export const updateUserDTO = Joi.object({
   fullName: Joi.string().min(2).max(50).required(),
  username: Joi.string().min(2).max(50).required(),
  image:Joi.string().optional(),
  coverImage:Joi.string().optional())
})