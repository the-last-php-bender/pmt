  import mongoose from 'mongoose';
  import bcrypt from 'bcryptjs';
  import { v4 as uuidv4 } from 'uuid';
  import EmailService from '../utils/emailService.js';

  class Company {
    constructor() {
      if (!Company.instance) {
        this._initializeSchema();
        this._initializeModel();
        Company.instance = this; // Singleton pattern
      }
      return Company.instance; // Always return the same instance
    }
    _initializeSchema() {
      this.companySchema = new mongoose.Schema({
        companyName: {
          type: String,
          required: true,
        },
        cEmail: {
          type: String,
          required: true,
          unique: true,
          validate: {
            validator: function (v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          }
        },
        cPassword: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: 'company',
        }
      }, {
        timestamps: true
      });
      this.companySchema.pre('save', async function (next) {
        if (this.isNew) {
          const generatedPassword = uuidv4();
          this.cPassword = await bcrypt.hash(generatedPassword, 10);
          if(this.role==="comapny"){
          await EmailService.sendCompanyPassword(this.cEmail, this.companyName, generatedPassword);
          }
          
        }
        next();
      });
      this.companySchema.methods.comparePassword = async function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.cPassword);
      };
    }
    _initializeModel() {
      this.CompanyModel = mongoose.models.Company || mongoose.model('Company', this.companySchema);
    }
    getModel() {
      return this.CompanyModel;
    }
  }
  export default new Company().getModel();
