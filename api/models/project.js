import mongoose from 'mongoose';

class Project {
  constructor() {
    const projectSchema = new mongoose.Schema({
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
        enum: ['opened', 'closed'],
        default: 'opened',
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        default: null,
      },
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
    }, {
      timestamps: true, 
      paranoid: true,
    });
    projectSchema.statics.softDelete = async function (id) {
      return this.findByIdAndUpdate(id, { deletedAt: new Date() });
    };

    projectSchema.methods.restore = async function () {
      this.deletedAt = null;
      return this.save();
    };

    this.ProjectModel = mongoose.model('Project', projectSchema);
  }

  getModel() {
    return this.ProjectModel;
  }
}

export default new Project().getModel();
