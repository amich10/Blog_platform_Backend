import BaseService from "../../services/base.service.js";
import slugify from "slugify";
import cloudinarySvc from "../../services/cloudinary.services.js";
import postModel from "./posts.model.js";
import { postStatus } from "../../config/constants.js";

class postService extends BaseService {
  constructor() {
    super(postModel);
  }

  transformCreatepost = async (req) => {
    try {
      let payload = req.body;
      let slug = payload.title.replace(/['"]/g, ""); //removes ' and " from the string
      payload.slug = slugify(slug);

      if (
        payload.categoryId === null ||
        payload.categoryId === "" ||
        !payload.categoryId
      ) {
        payload.categoryId = null;
      }
      payload.authorId = req.authUser._id;
      payload.views = 0;
      payload.likes = [];
      payload.commentsCount = 0;

      if (payload.status === postStatus.PUBLISHED) {
        payload.publishedAt = new Date(); // Set to current date if published
      } else {
        payload.publishedAt = null;
      }
      /*    // Handle image upload (multiple images)
        if (req.files && req.files.length > 0) {
            payload.images = [];
            for (let file of req.files) {
                let uploadedImage = await cloudinarySvc.fileUpload(file.path, '/Post');
                payload.images.push({
                    url: uploadedImage.url,
                    optimizedUrl: uploadedImage.optimizedUrl 
                });
            }
        }
 */
      //multiple images
      let images = [];
      payload.images = [];
      if (req.files) {
        req.files.map((image) => {
          images.push(cloudinarySvc.fileUpload(image.path, "/Posts"));
        });
        let uploadedImages = await Promise.allSettled(images);

        uploadedImages.map((cloudinaryImage) => {
          if (cloudinaryImage.status === "fulfilled") {
            payload.images.push(cloudinaryImage.value);
          }
        });
      }
      return payload;
    } catch (exception) {
      throw exception;
    }
  };

  transformUpdatepost = async (req, oldData) => {
    try {
      let payload = req.body;

      if (payload.title) {
        //generate new slug if  title changes
        let slug = payload.title.replace(/['"]/g, "");
        payload.slug = slugify(slug);
      }

      if (
        payload.categoryId === null ||
        payload.categoryId === "" ||
        !payload.categoryId
      ) {
        payload.categoryId = null;
      }

      if (payload.status === postStatus.PUBLISHED) {
        payload.publishedAt = new Date();
      } else if (payload.status === postStatus.UNPUBLISHED) {
        payload.publishedAt = null;
      }

      if (req.files && req.files.length > 0) {
        let uploadPromises = req.files.map((file) =>
          cloudinarySvc.fileUpload(file.path, "/Posts")
        );

        const uploadedImages = await Promise.allSettled(uploadPromises);

        payload.images = []; // Optional: replace all existing images
        uploadedImages.forEach((result) => {
          if (result.status === "fulfilled") {
            payload.images.push(result.value);
          }
        });
      }

      payload.updatedBy = req.authUser._id;

      return payload;
    } catch (exception) {
      throw exception;
    }
  };

  listAllpost = async ({ query, filter = {} }) => {
    try {
      //pagination
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const skip = (page - 1) * limit;

      //sorting
      let sort = { title: "asc" }; //default
      if (query.sort) {
        //sort_desc
        const [column_name, direction] = query.sort.split("_"); //converts sort_des into ['sort','desc']
        sort = { [column_name]: direction };
      }

      //get posts
      const data = await postModel
        .find(filter)
        .populate("categoryId", ["_id", "title", "slug", "status", "image"])
        .populate("authorId", ["_id", "username", "email", "status", "role"])
        .populate("")
        .sort(sort)
        .limit(limit)
        .skip(skip);

      const countTotal = await postModel.countDocuments(filter);

      return {
        data: data,
        pagination: {
          page: page,
          limit: limit,
          total: countTotal,
        },
      };
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };
}

const postSvc = new postService();
export default postSvc;
