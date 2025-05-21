import cloudinarySvc from "../../services/cloudinary.services.js";
import bcrypt from "bcryptjs";
import { randomStringGenerator } from "../../utils/helpers.js";
import { userStatus } from "../../config/constants.js";
import UserModel from "../user/user.model.js";
import emailSvc from "../../services/email.service.js";
import { appConfig, smtpConfig } from "../../config/constants.js";

class AuthService {
  registerDataTransformer = async (req) => {
    try {
      let data = req.body;
      let file = req.file;
      data.image = await cloudinarySvc.fileUpload(file.path, "users/");
      (data.password = bcrypt.hashSync(data.password, 12)),
        (data.status = userStatus.INACTIVE);
      data.activationToken = randomStringGenerator();
      return data;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  userStore = async (data) => {
    try {
      const userObj = await UserModel(data);
      return await userObj.save();
    } catch (exception) {
      throw exception;
    }
  };

  getSingleUserByFilter = async (filter) => {
    try {
      const user = await UserModel.findOne(filter);
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleUserByFilter = async (filter, updateData) => {
    try {
      const updateUser = await UserModel.findOneAndUpdate(
        filter,
        { $set: updateData },
        { new: true }
      );
      return updateUser;
    } catch (exception) {
      throw exception;
    }
  };

  publicProfileUser = (userObj) => {
    return {
      _id: userObj._id,
      name: userObj.fullName,
      username: userObj.username,
      email: userObj.email,
      bio: userObj.bio,
      role: userObj.role,
      phone: userObj.phone,
      address: userObj.address,
      status: userObj.status,
      isVerified: userObj.isVerified,
      image: userObj.image,
      socialLinks: userObj.socialLinks,
      createdAt: userObj.createdAt,
      followers:userObj.followers,
      following:userObj.following
      posts:userObj.po
    };
  };

  emailActivationNotify = async ({
    name,
    username,
    email,
    activationToken,
  }) => {
    try {
      const activationLink = `${appConfig.frontendUrl}/activate/${activationToken}`;
      console.log(appConfig.frontendUrl);
      let msg = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #008000;">Welcome to KATHA-HARU!</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for registering with <strong>KATHA-HARU</strong>. We're excited to have you on board!</p>
            <p>Your username is: <strong>${username}</strong>.</p>
            <p>To activate your account, please click the link below or copy and paste it into your browser:</p>
            <p>
              <a href="${activationLink}" style="color: #008000; text-decoration: underline;">
                ${activationLink}
              </a>
            </p>
            <p>If you did not register for an account with us, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>The KATHA-HARU Team</strong></p>
            <hr style="border: 0; border-top: 1px solid #ddd;">
            <p style="font-size: 0.9em; color: #777;">
              <em>Please do not reply to this email. If you have any questions or need assistance, please contact our support team at <a href="mailto:support@kathaharu.com" style="color: #008000; text-decoration: none;">support@kathaharu.com</a>.</em>
            </p>
          </div>
        </body>
      </html>
    `;
      await emailSvc.sendEmail({
        to: email,
        sub: "Activate Your KATHA-HARU Account",
        message: msg,
      });

      console.log(`Activation email sent successfully to ${email}.`);
    } catch (exception) {
      throw exception;
    }
  };

  notifyForgetPasswordEmail = async ({ name, email, forgetPaswordToken }) => {
    try {
      let msg = `
          <strong>Dear ${name},</strong> <br>
          <p>You have requested to reset your passwod. To change your password, please follow the following steps.</P>
          </em>Please click the link below or copy paste url in the browser of your choice to reset your password</p>
          <a href="${appConfig.frontendUrl}/verify-token/${forgetPaswordToken}" style="color: #008000; text-decoration:underline;">
          ${appConfig.frontendUrl}/verify-token/${forgetPaswordToken}</a>
          <br>
          <p><strong>Note: This link is valid for 1 hour only.</strong></p>
          <p><strong>Regards,<strong></p>
          <p><strong>${smtpConfig.fromAddress}</strong></p>
          <p><small><em>Please do not reply to this email directly, please contact our administation for further assiatance.</em></small></p>`;

      return await emailSvc.sendEmail({
        to: email,
        sub: "Reset your password",
        message: msg,
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const authSvc = new AuthService();
export default authSvc;
