import { postStatus, userStatus } from "../../config/constants.js";
import PostModel from "./posts.model.js";
import postSvc from "./posts.service.js";

class postControl {
  storePost = async (req, res, next) => {
    try {
      let payload = await postSvc.transformCreatepost(req);
      let data = await postSvc.create(payload);

      res.json({
        data: data,
        message: "post created Successfuly",
        status: "post_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  showAllpost = async (req, res, next) => {
    try {
      //search
      let filter = {};
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter = {
          $or: [{ title: searchRegex }, { slug: searchRegex }],
        };
      }
      // console.log("FILTER APPLIED:", filter)
      const { data, pagination } = await postSvc.listAllpost({
        query: req.query,
        filter,
      });
      res.json({
        data: data,
        message: "All posts listed",
        status: "post_LISTED",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };
  getpostDetailBySlug = async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const post = await postSvc.getSingleRow({
        slug: slug,
      });
      if (!post) {
        next({
          data: null,
          message: `Post not found`,
          status: "POST_NOT_FOUND",
          options: null,
        });
      }
      res.json({
        data: post,
        message: "A single post detail",
        status: "post_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  getPublishedposts = async (req, res, next) => {
    try {
      const filter = {
        status: postStatus.PUBLISHED,
      };
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter.$or = [{ title: searchRegex }, { slug: searchRegex }];
      }
      const { data, pagination } = await postSvc.listAllpost({
        filter,
        query: req.query,
      });
      res.json({
        data: data,
        message: "All the published posts",
        status: "ACTIVE_posts",
        options: { ...pagination },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
  updatepostById = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post = await postSvc.getSingleRow({
        _id: postId,
      });
      if (!post) {
        next({
          code: 422,
          message: "post not found",
          status: "post_NOT_FOUND",
          options: null,
        });
      }

      //if post found
      const payload = await postSvc.transformUpdatepost(req, post);

      const updatedpost = await postSvc.updateRowByFilter(
        {
          _id: postId,
        },
        payload
      );

      res.json({
        data: updatedpost,
        message: "post Updated",
        status: "post_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  deleteCatgoryById = async (req, res, next) => {
    try {
      let postId = req.params.id;
      const post = await postSvc.deleteRowByFilter({
        _id: postId,
      });
      res.json({
        data: null,
        message: "A categoory deleted",
        status: "post_DELETED",
      });
    } catch (exception) {
      next(exception);
    }
  };

  incrementViews = async (req, res, next) => {
    try {
      const slug = req.params.slug;

      const post = await PostModel.findOne({ slug });

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      //check if the post has been viewed before
      const lastViews = post.lastViewedAt || 0;
      const currentTime = Date.now();

      // If the post was viewed less than a minute ago, don't set the timeout again
      if (currentTime - lastViews < 60000) {
        return res.json({
          message:
            "View already counted recently. Please wait before refreshing again",
          views: post.views,
        });
      }
      // Set the last viewed time to now
      post.lastViewedAt = currentTime;
      await post.save();

      
    // After 1 minute (60,000 ms), increment the view count
    setTimeout(async () => {
        try {
          post.views += 1;
          await post.save();
          console.log(`Post views incremented for post with slug ${slug}`);
        } catch (error) {
          console.error("Error incrementing views:", error);
        }
      }, 60000); // 60,000 ms = 1 minute


      res.status(200).json({
        message: "Thanks for viewing! We're updating the view count.",
        views: post.views,
      });

    } catch (exception) {
        next(exception)
    }
  };


  //like a post 
  likePost = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const userId = req.authUser._id;
  
      const post = await PostModel.findOne({ slug }); 
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user already liked the post
      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: "You already liked this post" });
      }
  
      // Add user to likes
      post.likes.push(userId);
      await post.save();
  
      res.status(200).json({
        message: "Post liked successfully",
        likes: post.likes.length,
      });
    } catch (error) {
      next(error);
    }
  };

  commentOnPost = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { comment } = req.body; 
      const userId = req.authUser._id;
  
      const post = await PostModel.findOne({ slug }); 
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Increment comments count
      post.commentsCount += 1;
      await post.save();
  
      res.status(200).json({
        message: "Comment added successfully",
        commentsCount: post.commentsCount,
      });
    } catch (error) {
      next(error);
    }

}

const postCtrl = new postControl();
export default postCtrl;
