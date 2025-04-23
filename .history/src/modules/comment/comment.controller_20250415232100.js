import CommentModel from './comment.model'; // Assuming you have a Comment model
import commentSvc from './comment.service';

class commentControl {
    createComment = async (req, res, next) => {
        try {
            const data = req.body;

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

            const comments = await commentSvc.(postId);

            res.status(200).json({
                message: "Comments retrieved successfully",
                status: "COMMENTS_RETRIEVED",
                options: null,
                data: comments // Include the retrieved comments in the response
            });
        } catch (exception) {
            next(exception);
        }
    };
}

const commentCtl = new commentControl();
export default commentCtl;