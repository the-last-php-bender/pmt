import express from 'express';
import TaskControllers from '../controllers/TaskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import RoleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('lead'),
  TaskControllers.createTask
);
router.get(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('lead'),
  TaskControllers.getTaskById
);
router.put(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('lead'),
  TaskControllers.updateTask
);
router.delete(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('lead'),
  TaskControllers.deleteTask
);

export default router;
