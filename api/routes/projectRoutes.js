import express from 'express';
import ProjectController from '../controllers/ProjectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import RoleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  ProjectController.createProject
);
router.get(
  '/',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  ProjectController.getProjects
);
router.get(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  ProjectController.getProjectById
);
router.put(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  ProjectController.updateProject
);
router.delete(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  ProjectController.deleteProject
);

export default router;
