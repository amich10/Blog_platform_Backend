import { appConfig, userStatus } from "../../config/constants.js";
import authSvc from "./auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomStringGenerator } from "../../utils/helpers.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const userData = await authSvc.registerDataTransformer(req);
      const userObj = await authSvc.userStore(userData);

      await authSvc.emailActivationNotify({
        name: userObj.fullName,
        username: userObj.username,
        email: userObj.email,
        activationToken: userObj.activationToken,
      });

      console.log(userObj);

      res.json({
        data: authSvc.publicProfileUser(userObj),
        message:
          " Thank you for registering with us. Please check your email to activate your account.",
        status: "USER_REGISTERED_AND_ACTIVATE_YOUR_ACCOUNT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      const token = req.params.token || null;

      if (!token) {
        throw {
          code: 422,
          message: "Activation token is missing",
          status: "ACTIVATION_TOKEN_NOT_RECEIVED",
        };
      }

      const associatedUser = await authSvc.getSingleUserByFilter({
        activationToken: token,
      });

      if (!associatedUser) {
        throw {
          code: 422,
          message: "Associated user not found, Enter a valid token",
          status: "ASSOCIATED_USER_NOT_FOUND",
        };
      }

      // acitvate user after assocaited user is found
      const userData = {
        status: userStatus.ACTIVE,
        activationToken: null,
      };

      //update user

      await authSvc.updateSingleUserByFilter(
        { _id: associatedUser._id },
        userData
      );

      res.json({
        data: null,
        message: "Your account has been activated. Please, login to continue",
        status: "ACCOUNT_ACTIVATION_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await authSvc.getSingleUserByFilter({
        username: username,
      });

      if (!user) {
        throw {
          code: 422,
          message: "User doesnot exist, please type valid username",
          status: "USER_NOT_FOUND",
        };
      } else if (!bcrypt.compareSync(password, user.password)) {
        throw {
          code: 403,
          message: "Please, enter a valid password.",
          status: "CREDENTIALS_DONOT_MATCH",
        };
      } else {
        let accessToken = jwt.sign(
          {
            sub: user._id,
            typ: "access",
          },
          appConfig.jwtSecret,
          { expiresIn: "3 hours" }
        );

        let refreshToken = jwt.sign(
          {
            sub: user._id,
            typ: "refresh",
          },
          appConfig.jwtSecret,
          {
            expiresIn: "1 day",
          }
        );

        res.json({
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          message: "You have been logged in successfully",
          status: "LOG_IN_SUCCESSFUL",
          options: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };
  getUserProfile = async (req, res, nex) => {
    res.json({
      data: req.authUser,
      message: "Your profile",
      status: "LOGGED_IN",
      options: null,
    });
  };
  forgetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await authSvc.getSingleUserByFilter({
        email: email,
      });
      if (!user) {
        next({
          code: 400,
          detail: {
            email: "email has not been registered yet!",
          },
          message: "User with that email not found",
          status: "USER_NOT_FOUND",
        });
      }

      let updateData = {
        forgetPasswordToken: randomStringGenerator(100),
        expiryDate: new Date(Date.now() + 60 * 60 + 1000), //1 hour
      };

      await authSvc.updateSingleUserByFilter(
        {
          email: email,
        },
        updateData
      );

      //notify the user
      await authSvc.notifyForgetPasswordEmail({
        name: user.fullName,
        email: user.email,
        forgetPaswordToken: updateData.forgetPasswordToken,
      });

      res.json({
        data: null,
        message:
          "A link has been forwared to your registered email to reset your password",
        status: "FORGET_PASSWORD_LINK_SENT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgetPasswordToken = async (req, res, next) => {
    try {
      const token = req.params.token;
      const user = await authSvc.getSingleUserByFilter({
        forgetPasswordToken:token
      })

      if(!user){
        next({
          code:422,
          message:"Verfiy token does not exist or already been used.",
          status:"TOKEN_NOT_FOUND"
        })
      }

      const tokenExpiry = user.expiryDate.getTime() // converts expiry date to milisec
      const currentTime = Date.now() //current time in milisec

      //check if token is expired
      if (currentTime >= tokenExpiry){
        next({
          code:422,
          
        })
      }


      if(currentTime > tokenExpiry)

    } catch (exception) {
      next(exception)
    }
  };
  resetPassword = async(req,res,next) => {
    try {
      const {token,password} = req.body;
      const user = await authSvc.getSingleUserByFilter({
        forgetPasswordToken : token,
      })
      if(!user){
        next({
          code:422,
          message:"Forget password token does not exist or already been used.",
          status:"TOKEN_DOES_NOT_EXIST"
        })
      }

      //update data after reset
      const data = {
        forgetPasswordToken:null,
        expiryDate:null,
        password:bcrypt.hashSync(password,12),
        status:userStatus.ACTIVE
      }

      const updateUser = await authSvc.updateSingleUserByFilter({
        _id:user._id
      },data)

      res.json({
        code:201,
        data:null,
        message:"Your password has been rest. Please, login to continue",
        status:"PASSWORD_RESET_SUCCESS",
        options:null
      })

    } catch (exception) {
      next(exception)
    }
  };
}

const authCtrl = new AuthController();

export default authCtrl;
