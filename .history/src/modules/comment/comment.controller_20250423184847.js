import { userRoles } from '../../config/constants.js';
import CommentModel from './comment.mode.js';
import commentSvc from './comment.service.js';

class commentControl {
    createComment = async (req, res, next) => {
        try {
            const data = req.body;
            data.userId = req.authUser._id;

            const comment = await commentSvc.create(data);

            res.status(201).json({
                message: "Comment created successfully",
                status: "COMMENT_CREATED",
                options: null,
                data: comment
            });
        } catch (exception) {
            next(exception);
        }
    };

    getCommentsByPostId = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const comments = await CommentModel.find({
                postId: postId
            })

            res.status(200).json({
                message: "Comments retrieved successfully",
                status: "COMMENTS_RETRIEVED",
                options: null,
                data: comments
            });
        } catch (exception) {
            next(exception);
        }
    };

    updateComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const data = req.body;
s
            const comment = await CommentModel.findById(commentId);
            if (!comment) {
                return res.status(404).json({
                    message: "Comment not found",
                    status: "COMMENT_NOT_FOUND",
                    options: null,
                    data: null
                });
            }

            // Check if the user is the owner of the comment or an admin
            if (comment.userId !== req.authUser._id. && !req.authUser === userRoles.ADMIN) {
                return res.status(403).json({
                    message: "Unauthorized to update this comment",
                    status: "UNAUTHORIZED",
                    options: null,
                    data: null
                });
            }

            // Update the comment
            const updatedComment = await CommentModel.findByIdAndUpdate(commentId, data, { new: true });

            res.status(200).json({
                message: "Comment updated successfully",
                status: "COMMENT_UPDATED",
                options: null,
                data: updatedComment
            });
        } catch (exception) {
            next(exception);
        }
    };
    deleteComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;

            await commentSvc.deleteRowByFilter(commentId);

            res.status(200).json({
                message: "Comment deleted successfully",
                status: "COMMENT_DELETED",
                options: null,
                data: null
            });
        } catch (exception) {
            next(exception);
        }
    };
}

const commentCtl = new commentControl();
export default commentCtl;