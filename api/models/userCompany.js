import mongoose from 'mongoose';

class UserCompany {
    constructor() {
        if (!UserCompany.instance) {
            this._initializeSchema();
            this._initializeModel();
            UserCompany.instance = this; // Singleton pattern
        }
        return UserCompany.instance; // Always return the same instance
    }

    _initializeSchema() {
        this.userCompanySchema = new mongoose.Schema({
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company',
                required: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                type: String,
                enum: ['superadmin', 'lead', 'user'],
                default: 'user'
            },
            status: {
                type: String,
                enum: ['pending', 'approved', 'declined'],
                default: 'pending'
            }
        }, {
            timestamps: true
        });

        this.userCompanySchema.methods.softDelete = function() {
            this.deleted = true;
            return this.save();
        };

        this.userCompanySchema.methods.restore = function() {
            this.deleted = false;
            return this.save();
        };
    }

    _initializeModel() {
        this.UserCompanyModel = mongoose.models.UserCompany || mongoose.model('UserCompany', this.userCompanySchema);
    }

    getModel() {
        return this.UserCompanyModel;
    }
}

export default new UserCompany().getModel();
