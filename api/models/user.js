import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

class User {
  constructor() {
    if (!User.instance) {
      this._initializeSchema();
      this._initializeModel();
      User.instance = this; // Singleton pattern
    }
    return User.instance; // Always return the same instance
  }

  _initializeSchema() {
    this.userSchema = new mongoose.Schema({
      uName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
          },
          message: 'Please provide a valid email address.',
        },
      },
      activeStatus: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        required: true,
        select: false, 
      },
    }, {
      timestamps: true,
    });
    this.userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    });
    this.userSchema.methods.comparePassword = async function (candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    };
  }

  _initializeModel() {

    this.UserModel = mongoose.models.User || mongoose.model('User', this.userSchema);
  }

  getModel() {
    return this.UserModel;
  }
}

export default new User().getModel();
