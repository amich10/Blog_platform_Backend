import mongoose from "mongoose";
import { postStatus, userStatus } from "../../config/constants.js";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: { 
        type: String,
        trim: true,
        maxlength: 300,
        default: function () {
            return this.content?.substring(0, 150);  // Auto-generate excerpt from content if not provided
        }
    },
    tags: [{
        type: String,
        lowercase: true,
        trim: true,
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(postStatus),
        default: postStatus.UNPUBLISHED,
    },
    views: {
        type: Number,
        default: 0,
        min: 0,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    commentsCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    publishedAt: {
        type: Date,
        default: null,
    },
    image: [{
        url: {
          type: String,
          default: "",
        },
        optimizedUrl: {
          type: String,
          default: "",
        }
      }],
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
