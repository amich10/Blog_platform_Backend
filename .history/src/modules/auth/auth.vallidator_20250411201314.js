import joi from "joi";

const userRegisterDTO = joi.object({
  fullName: joi.string().min(2).max(50).required().messages({
    "string.min": "Full name must be at least 2 characters long.",
    "string.max":
      "The length of fullName must be leaa than or equal to 50 characters long.",
    "any.required": "fullName is required.",
  }),
  username: joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username must only contain letters and numbers.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be less than or equal to 30 characters.",
    "any.required": "Username is required.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "email is required",
  }),
  password: joi
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),
  confirmPassword: joi.string().equal(joi.ref("password")).required().messages({
    "any.only": "confirmPassword must be similar to password",
    "any.required": "Confirm password is required.",
  }),
  address: joi.string().allow(null, "").optional().messages({
    "string.base": "Address must be a string.",
  }),
  role: joi
    .string()
    .regex(/^(admin|author|user)$/)
    .default("user")
    .messages({
      "string.pattern.base": "Role must be either admin, author or user.",
      "any.required": "Role is required.",
    }),
  phone: joi.string().min(10).max(25).messages({
    "string.min": "Phone number must be at least 10 characters long.",
    "string.max": "Phone number can be maximum 25 characters long.",
  }),
  gender: joi
    .string()
    .regex(/^(male|female|other)$/)
    .messages({
      "string.pattern.base":
        "Gender must be one of 'male', 'female', or 'other'.",
    }),
  bio: joi.string().max(250).allow(null, "").optional().messages({
    "string.max": "Bio cannot exceed 250 characters.",
  }),
  image: joi.string().allow(null, "").default(null).optional(),
  socialLinks: joi
    .array()
    .items(
      joi
        .string()
        .uri()
        .messages({ "string.uri": "Each social link must be a valid URL." })
    )
    .optional(),
});

const userLoginDTO = joi.object({
  username: joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username must only contain letters and numbers.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be less than or equal to 30 characters.",
    "any.required": "Username is required.",
  }),
  password: joi
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),
});

const forgetPasswordDTO = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "email is required",
  }),
});

const resetPasswordDTO = joi.object({
  token:joi.string().req
})

export { userRegisterDTO, userLoginDTO,forgetPasswordDTO };
