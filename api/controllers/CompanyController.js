import Company from '../models/company.js';
import UserCompany from '../models/userCompany.js';
import User from '../models/user.js';

class CompanyController {
  async createCompany(req, res, next) {
    try {
      const { name, email, role } = req.body;
      const company = await Company.create({ companyName: name, cEmail: email, role });
      if (!company) {
        return res.status(500).json({ error: "An error occurred, contact the admin" });
      }
      return res.status(201).json({ company });
    } catch (error) {
      next(error);
    }
  }
  async updateCompany(req, res, next) {
    try {
      const { id } = req.company;
      const { companyName, cEmail, oldPassword, newPassword } = req.body;

      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      if (oldPassword) {
        const isOldPasswordValid = await company.comparePassword(oldPassword);
        if (!isOldPasswordValid) {
          return res.status(401).json({ error: 'Current password is incorrect' });
        }
      }

      if (newPassword) {
        if (!oldPassword) {
          return res.status(400).json({ error: 'Old password is required to update to a new password' });
        }
        company.password = newPassword; // Password will be hashed by pre("save") hook
      }

      company.companyName = companyName || company.companyName;
      company.cEmail = cEmail || company.cEmail;

      await company.save();
      return res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  }

  async getCompany(req, res, next) {
    try {
      const company = await Company.findAll();
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      return res.status(200).json({ company });
    } catch (error) {
      next(error);
    }
  }

  async requestToJoinCompany(req, res, next) {
    try {
      const { cKey } = req.body;
      const { userId } = req.user;

      if (!cKey) {
        return res.status(400).json({ message: 'Company cKey is required' });
      }

      const company = await Company.findOne({ where: { cKey } });
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const existingUserCompany = await UserCompany.findOne({ where: { companyId: company.id, userId } });
      if (existingUserCompany) {
        return res.status(400).json({ message: 'User is already associated with this company' });
      }

      const userCompanyRequest = await UserCompany.create({ companyId: company.id, userId, status: "pending" });
      res.status(201).json(userCompanyRequest);
    } catch (error) {
      next(error);
    }
  }

  async addUserCompanyStatus(req, res, next) {
    try {
      const { userId, companyId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }

      if (status !== 'accepted' && status !== 'rejected') {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      const userCompany = await UserCompany.findOne({
        where: { userId, companyId, status: 'pending' }
      });

      if (!userCompany) {
        return res.status(404).json({ message: 'Request not found' });
      }

      userCompany.status = status;
      await userCompany.save();
      res.status(200).json(userCompany);
    } catch (error) {
      next(error);
    }
  }

  async createSuperadmin(req, res, next) {
    try {
      const email = process.env.SUPERADMIN_EMAIL;
      const plainPassword = process.env.SUPERADMIN_PASSWORD;

      if (!email || !plainPassword) {
        return res.status(400).json({ error: 'Email and Password are required.' });
      }

      const superAdminExist = await Company.findOne({ where: { role: 'superadmin' } });
      if (superAdminExist) {
        return res.status(409).json({ error: 'Superadmin already exists' });
      }

      const superadmin = await Company.create({
        email,
        password: plainPassword,
        role: 'superadmin'
      });

      res.status(201).json({ message: 'Superadmin created successfully', superadmin });
    } catch (error) {
      console.error('Error creating superadmin:', error);
      next(error);
    }
  }
}

export default new CompanyController();
