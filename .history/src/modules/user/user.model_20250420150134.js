import mongoose from "mongoose";
import { genderTypes, userRoles, userStatus } from "../../config/constants.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: [genderTypes.MALE, genderTypes.FEMALE, genderTypes.OTHER],
    },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.AUTHOR, userRoles.USER],
      default: userRoles.USER,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      max: 500,
      default: "",
    },
    socialMedia: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: [userStatus.INACTIVE, userStatus.ACTIVE],
      default: userStatus.INACTIVE,
    },
    activationToken: {
      type: String,
      required: false,
    },
    forgetPasswordToken: {
      type: String,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    image: {
      url: {
        type: String,
        required: false,
      },
      optimizedUrl: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
