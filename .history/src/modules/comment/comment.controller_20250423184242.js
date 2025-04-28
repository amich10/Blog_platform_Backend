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
            const comments = await commentSvc.getSingleRow({
                _id: postId
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

            const updatedComment = await commentSvc.updateRowByFilter(commentId, data);

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