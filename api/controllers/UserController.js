import User from '../models/user.js';
import Task from '../models/task.js'; // Ensure correct path and naming
import UserCompany from '../models/userCompany.js'; // Ensure correct path and naming
import Company from '../models/company.js'; // Ensure correct path and naming

class UserController {
  async createUser(req, res, next) {
    try {
      const { uName, email, password } = req.body;

      if (!uName || !email || !password) {
        return res.status(400).json({ error: 'uName, email, and password are required' });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      const user = new User({ uName, email, password });
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      next(error);
    }
  }
  // async addUserToProject(req, res, next) {
  //   try {
  //     const { emails } = req.body; 
  //     const projectId = req.params.projectId; 
  //     const companyId = req.company.id;
  //     if (!companyId) {
  //       return res.status(401).json({ error: 'You are not authorized for this action' });
  //     }
  //     if (!Array.isArray(emails) || emails.length === 0) {
  //       return res.status(400).json({ error: 'Emails must be a non-empty array' });
  //     }
  //     const project = await Project.findById(projectId);
  //     if (!project) {
  //       return res.status(404).json({ error: 'Project not found' });
  //     }
  //     for (const email of emails) {
  //       const user = await User.findOne({ where: { email } });
        
  //       if (user) {
  //         await userProject.create(user);
  //         console.log(`Added user ${user.email} to project ${project.title}`);
  //       } else {
  //         console.log(`User with email ${email} not found`);
  //       }
  //     }
  
  //     res.status(200).json({ message: 'Users added to project successfully' });
  //   } catch (error) {
  //     console.error('Error adding users to project:', error);
  //     next(error);
  //   }
  // }
  
  async getCompanyUsers(req, res, next) {
    try {
      const { companyId } = req.company.id;
      if (!companyId) {
        return res.status(400).json({ error: 'Authorization error. Contact support.' });
      }

      const userCompanies = await UserCompany.find({ companyId }).select('userId');
      if (!userCompanies.length) {
        return res.status(404).json({ message: 'No users found for this company' });
      }

      const userIds = userCompanies.map(uc => uc.userId);
      const users = await User.find({ _id: { $in: userIds } });
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUsersCompany(req, res, next) {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: 'User is not authenticated' });
      }

      const userCompanies = await UserCompany.find({ userId }).select('companyId');
      const companyIds = userCompanies.map(uc => uc.companyId);
      const companies = await Company.find({ _id: { $in: companyIds } });
      return res.status(200).json(companies);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { companyId } = req.company;
      const { id } = req.params;
      const { role } = req.body;

      if (!companyId) {
        return res.status(401).json({ error: 'You are not authenticated' });
      }

      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User does not exist' });
      }

      const validRoles = ['lead', 'user'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role specified' });
      }

      user.role = role;
      await user.save();

      return res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.user;
      const { oldPassword, newPassword, uName, email } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (oldPassword) {
        const isOldPasswordValid = await user.comparePassword(oldPassword);
        if (!isOldPasswordValid) {
          return res.status(401).json({ error: 'Current password is incorrect' });
        }
      }

      if (newPassword) {
        if (!oldPassword) {
          return res.status(400).json({ error: 'Old password is required to update to a new password' });
        }
        user.password = await user.hashPassword(newPassword);
      }

      user.uName = uName || user.uName;
      user.email = email || user.email;

      await user.save();
      return res.status(200).json({ message: 'Your profile has been updated', user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { company } = req.body;

      const userCompany = await UserCompany.findOne({ userId: id, companyId: company.id });
      if (!userCompany) {
        return res.status(404).json({ error: 'User not found or unauthorized action' });
      }

      const tasks = await Task.find({ assigneeId: id, companyId: company.id });
      for (const task of tasks) {
        task.assigneeId = null;
        await task.save();
      }

      await UserCompany.deleteOne({ userId: id, companyId: company.id });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
