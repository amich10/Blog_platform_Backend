import authSvc from "./auth.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const userData = await authSvc.registerDataTransformer(req);
      const userObj = await authSvc.userStore(userData);

      res.json({
        data: userObj,
        message: " User register success call",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = () => {};
  loginUser = () => {};
  getUserProfile = () => {};
  forgetPassword = () => {};
  resetPassword = () => {};
}

const authCtrl = new AuthController();

export default authCtrl;
