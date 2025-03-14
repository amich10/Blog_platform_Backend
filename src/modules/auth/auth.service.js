import cloudinarySvc from "../../services/cloudinary.services.js";
import bcrypt from "bcryptjs";
import { randomStringGenerator } from "../../utils/helpers.js";
import { userStatus } from "../../config/constants.js";
import UserModel from "../user/user.model.js";

class AuthService {
  registerDataTransformer = async (req) => {
    try {
      let data = req.body;
      let file = req.file;
      data.image = await cloudinarySvc.fileUpload(req.file.path, "users/");

      (data.password = bcrypt.hashSync(data.password, 12)),
        (data.status = userStatus.INACTIVE);
      data.activationToken = randomStringGenerator();
      data.verificationToken = randomStringGenerator(15);

      return data;
    } catch (exception) {
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
}

const authSvc = new AuthService();
export default authSvc;
