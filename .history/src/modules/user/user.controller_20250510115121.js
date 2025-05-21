import cloudinarySvc from "../../services/cloudinary.services.js";
import PostModel from "../posts/posts.model.js";

import UserModel from "./user.model.js";
import userSvc from "./user.service.js";
import bcrypt from "bcryptjs";
class UserController {
  createUser = async (req, res, next) => {
    try {
      let payload = req.body;
      payload.image = await cloudinarySvc.fileUpload(req.file.path, "users/");
      payload.password = bcrypt.hashSync(payload.password, 12);

      const data = await userSvc.create(payload);
      res.json({
        data: data,
        message: "User created successfully",
        status: "USER_CREATED",
        options: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter = {
          $or: [
            { username: searchRegex },
            { fullName: searchRegex },
            { email: searchRegex },
          ],
        };
      }

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skip = (page - 1) * limit;

      let sort = { username: "asc" };
      if (req.query.sort) {
        const [column_name, direction] = req.query.sort.split("_"); //converts sort_des into ['sort','desc']
        if (["asc", "desc"].includes(direction)) {
          sort = { [column_name]: direction };
        }
      }

      const data = await UserModel.find(filter)
        .limit(limit)
        .skip(skip)
        .sort(sort);

      const countTotal = await UserModel.countDocuments(filter);

      res.json({
        data: data,
        message: "All user list",
        status: "USER_LIST",
        options: {
          pagination: {
            page: page,
            limit: limit,
            total: countTotal,
          },
        },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await userSvc.getSingleRow({
        _id: userId,
      });

      if (!user) {
        res.json({
          code: 404,
          message: "User not found",
          status: "USER_NOT_FOUND",
          options: null,
        });
      }

      res.json({
        data: user,
        message: "A single user detail",
        status: "USER_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };


getUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId; \

    const posts = await PostModel.find({ authorId: userId })
      .populate("categoryId") 
      .populate("authorId") // show limited user info
      .sort({ createdAt: -1 });

    res.json({
      data: posts,
      message: "Posts by user retrieved successfully.",
      status: "USER_POSTS_RETRIEVED",
      options: null,
    });
  } catch (error) {
    next(error);
  }
};
  
  updateUserById = async (req, res, next) => {
    try {
      let userId = req.params.id;

      const user = await userSvc.getSingleRow({
        _id: userId,
      });

      if (!user) {
        return res.json({
          code: 404,
          message: "User does not exist",
          status: "USER_NOT_FOUND",
          options: null,
        });
      }

      let payload = req.body;

      if (payload.email && payload.email !== user.email) {
        payload.email = user.email;
      }

      if (payload.username && payload.username !== user.username) {
        payload.username = user.username;
      }

      if (req.file && req.file.path) {
        payload.image = await cloudinarySvc.fileUpload(req.file.path, "users/");
      }

      const updatedData = await userSvc.updateRowByFilter(
        {
          _id: userId,
        },
        payload
      );

      res.json({
        data: updatedData,
        message: "User details updated",
        status: "USER_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      await userSvc.deleteRowByFilter({
        _id: userId,
      });

      res.json({
        data: null,
        message: "User deleted",
        status: "USER_DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserStats = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await userSvc.getSingleRow({
        _id: userId,
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "USER_NOT_FOUND",
        });
      }

      const postCount = await PostModel.countDocuments({ authorId: userId });
      const followersCount = user.followers.length;
      const followingList = user.following.length;

      res.json({
        data: {
          postCount,
          followersCount,
          followingList,
        },
        message: "User stats",
        status: "USER_STATS",
      });
    } catch (exception) {
      next(exception);
    }
  };
  // Route to check follow status
 followStatus =  async (req, res) => {
  try {
    const currentUserId = req.authUser._id;
    const targetUserId = req.params.id;

    if (targetUserId === String(currentUserId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const currentUser = await UserModel.findById(currentUserId);
    const isFollowing = currentUser.following.includes(targetUserId);

    res.json({
      data:{
        isFollowing
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

  toggleFollowUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const currentUserId = req.authUser._id;

      
    if (userId === String(currentUserId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

      const user = await UserModel.findById(userId);
      const currentUser = await UserModel.findById(currentUserId);
      

      if (!user || !currentUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isFollowing = currentUser.following.includes(userId);

      if (isFollowing) {
        currentUser.following.pull(userId);
        user.followers.pull(currentUserId);
      } else {
        currentUser.following.push(userId);
        user.followers.push(currentUserId);
      }

      await currentUser.save();
      await user.save();

      const populatedCurrentUser = await UserModel.findById(
        currentUserId
      ).populate([
        {
          path: "following",
          select: "username",
        },
        {
          path: "followers",
          select: "username",
        },
      ]);

      const populatedTargetUser = await UserModel.findById(userId).populate([
        {
          path: "following",
          select: "username",
        },
        {
          path: "followers",
          select: "username",
        },
      ]);

      res.json({
        message: isFollowing ? "Unfollowed user" : "Followed user",
        status: "FOLLOW_STATUS_UPDATED",
        currentUser: {
          following: populatedCurrentUser.following,
          followers: populatedCurrentUser.followers,
        },
        targetUser: {
          following: populatedTargetUser.following,
          followers: populatedTargetUser.followers,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();
export default userCtrl;
