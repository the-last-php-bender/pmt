import mongoose from 'mongoose';
import EmailService from '../utils/emailService.js';
import user from './user.js';

class Task {
  constructor() {
    if (!Task.instance) {
      this._initializeSchema();
      this._initializeModel();
      Task.instance = this; // Singleton pattern
    }
    return Task.instance; // Always return the same instance
  }

  _initializeSchema() {
    this.taskSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ['todo', 'progress', 'review', 'done'],
        default: 'todo',
      },
      approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      dueDate: {
        type: Date,
        default: null,
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
      assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
      deletedAt: {
        type: Date,
        default: null,
      },
    }, {
      timestamps: true
    });
    this.taskSchema.pre('save', async function (next) {
      if (this.isNew) {
        try {
          const users = await User.find(this.assigneeId); 
          await EmailService.sendTaskCreation(user.email,this.title);
          next();
        } catch (error) {
          next(error);
        }
      } 
    });
    this.taskSchema.statics.softDelete = async function (id) {
      return this.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    };

    this.taskSchema.methods.restore = async function () {
      this.deletedAt = null;
      return this.save();
    };
  }
  _initializeModel() {
    this.TaskModel = mongoose.models.Task || mongoose.model('Task', this.taskSchema);
  }
  getModel() {
    return this.TaskModel;
  }
}
export default new Task().getModel();
