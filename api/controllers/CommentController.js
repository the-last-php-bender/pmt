import Comment from '../models/comment.js'; // Adjust the path as needed

class CommentController {
  async createComment(req, res, next) {
    try {
      const { user } = req;
      const { content, taskId, parentCommentId } = req.body;

      if (!content || !taskId) {
        return res.status(400).json({ message: "Content and task ID are required" });
      }

      const comment = await Comment.create({
        content,
        userId: user._id, // Ensure user._id is used
        taskId,
        parentCommentId
      });

      return res.status(201).json({ message: "Comment created successfully", comment });
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { user } = req;
      const { content } = req.body;

      const comment = await Comment.findOne({ _id: commentId, userId: user._id });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found or you don't have permission to update this comment" });
      }

      comment.content = content || comment.content;
      await comment.save();

      return res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { user } = req;

      const comment = await Comment.findOne({ _id: commentId, userId: user._id });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found or you don't have permission to delete this comment" });
      }

      await comment.remove(); 
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
