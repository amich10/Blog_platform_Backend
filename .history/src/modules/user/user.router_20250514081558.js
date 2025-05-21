import { Router } from "express";
import allowUsers from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file_handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import userCtrl from "./user.controller.js";
import { userDTO } from "./user.vallidator.js";
import userSvc from "./user.service.js";

const userRouter = Router();

userRouter.post(
  "/create",
  allowUsers(userRoles.ADMIN),
  uploader().single("image"),
  bodyValidator(userDTO),
  userCtrl.createUser
);
userRouter.get("/all", allowUsers(), userCtrl.getAllUsers);
userRouter.get("/:id", allowUsers(), userCtrl.getUserById);

userRouter.delete("/:id", allowUsers(userRoles.ADMIN), userCtrl.deleteUserById);
userRouter.get("/:id/stats", userCtrl.getUserStats);

userRouter.post("/:id/follow", allowUsers(), userCtrl.toggleFollowUser);
userRouter.post("/:id/unfollow", allowUsers(), userCtrl.toggleFollowUser);
userRouter.get("/:id/follow-status", allowUsers(), userCtrl.followStatus);


export default userRouter;
