import mongoose from "mongoose";
import { genderTypes, userRoles, userStatus } from "../../config/constants.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      required: false,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
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
    phone: String,
    address: String,
    bio: {
      type: String,
      max: 500,
      default: "",
    },
    socialMedia: String,
    status: {
      type: String,
      enum: [userStatus.INACTIVE, userStatus.ACTIVE],
      default: userStatus.INACTIVE,
    },
    activationToken: String,
    forgetPasswordToken: String,
    expiryDate: Date,
    image: {
      url: String,
      optimizedUrl: String,
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
