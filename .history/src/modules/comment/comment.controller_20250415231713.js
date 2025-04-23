import CommentModel from './comment.model'; // Assuming you have a Comment model
import commentSvc from './comment.service';

class commentControl {
    createComment = async (req, res, next) => {
        try {
            const data = req.body;

            const comment = await commentSvc.create(data)
            res.status(201).json(newComment);
        } catch (exception) {
            next(exception);
        }
    };
}

const commentCtl = new commentControl();
export default commentCtl;