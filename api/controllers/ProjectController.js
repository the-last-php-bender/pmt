import Project from '../models/project.js';
import User from '../models/user.js'; 

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, description, companyId, status, startDate, endDate } = req.body;

      if (!title || !companyId || !startDate) {
        return res.status(400).json({ error: 'Title, companyId, and startDate are required' });
      }

      const company = await User.findById(companyId);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      const project = new Project({
        title,
        description,
        companyId,
        status,
        startDate,
        endDate,
      });

      await project.save();
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async getProjects(req, res, next) {
    try {
      const { company } = req;

      if (!company) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const projects = await Project.find({ companyId: company._id }).populate('companyId', 'name');

      if (projects.length === 0) {
        return res.status(404).json({ message: 'No projects found for this company' });
      }

      const response = projects.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate
      }));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id)
        .populate('companyId', 'name')
        .populate('tasks');

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, companyId, status, startDate, endDate } = req.body;

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      if (companyId) {
        const company = await User.findById(companyId);
        if (!company) {
          return res.status(404).json({ error: 'Company not found' });
        }
      }

      if (status && !['opened', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      project.title = title || project.title;
      project.description = description || project.description;
      project.companyId = companyId || project.companyId;
      project.status = status || project.status;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;

      await project.save();
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await Project.softDelete(id);  
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async restoreProject(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await project.restore();
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();
