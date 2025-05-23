import CommentModel from './comment.model'; // Assuming you have a Comment model

class commentControl {
    createComment = async (req, res, next) => {
        try {
            const data = req.body;

            
            // Create a new comment in the database
            const newComment = await CommentModel.create({
                text: data.text,
                author: data.author,
                postId: data.postId, // Assuming comments are linked to a post
            });

            // Respond with the created comment
            res.status(201).json(newComment);
        } catch (exception) {
            next(exception);
        }
    };
}

const commentCtl = new commentControl();
export default commentCtl;