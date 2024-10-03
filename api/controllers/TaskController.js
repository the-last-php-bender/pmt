import Task from '../models/task.js';
import Project from '../models/project.js';

class TaskController {
  async createTask(req, res, next) {
    try {
      const { title, description, status, priority, dueDate, projectId, assigneeId } = req.body;

      if (!title || !projectId) {
        return res.status(400).json({ error: 'Title and projectId are required' });
      }
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      const task = new Task({ title, description, status, priority, dueDate, projectId, assigneeId });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }
  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findById(id)
        .populate('projectId', 'title') 
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name email', 
          }
        });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, status, priority, dueDate, assigneeId } = req.body;

      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (status && !['open', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      if (priority && !['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
      }
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.priority = priority || task.priority;
      task.dueDate = dueDate || task.dueDate;
      task.assigneeId = assigneeId || task.assigneeId;

      await task.save();
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.remove(); 
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
export default new TaskController();
