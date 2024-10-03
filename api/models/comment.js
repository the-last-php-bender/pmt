import mongoose from 'mongoose';
class Comment {
  constructor() {
    const commentSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
      },
      taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    }, {
      timestamps: true, 
    });

    this.CommentModel = mongoose.model('Comment', commentSchema);
  }

  getModel() {
    return this.CommentModel;
  }
}

export default new Comment().getModel();
