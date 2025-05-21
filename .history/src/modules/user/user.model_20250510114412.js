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
    phone: String,
    address: String,
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
    activationToken: String,
    forgetPasswordToken: String,
    expiryDate: Date,
    image: {
      url: String,
      optimizedUrl: String,
    },
    followers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    following:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    posts:{
      type:
    }
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
