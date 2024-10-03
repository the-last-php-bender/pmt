import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import RoleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get(
  '/company',
  authMiddleware.authenticateToken,
  UserController.getUsersCompany
);
router.post('/signup', UserController.createUser);
router.put(
  '/role',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  UserController.updateUserRole
);
router.get(
  '/',
  authMiddleware.authenticateToken,
  UserController.getUserById
);
router.put(
  '/',
  authMiddleware.authenticateToken,
  UserController.updateUser
);
router.delete(
  '/',
  authMiddleware.authenticateToken,
  UserController.deleteUser
);
router.get(
  '/company/users',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  UserController.getCompanyUsers
);

export default router;
