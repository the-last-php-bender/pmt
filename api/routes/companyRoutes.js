import express from 'express';
import CompanyController from '../controllers/CompanyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import RoleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('superadmin'),
  CompanyController.createCompany
);
router.get(
  '/',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('superadmin'),
  CompanyController.getCompany
);
router.get(
  '/users',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('superadmin'),
  CompanyController.getUsers
);
router.put(
  '/:id',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  CompanyController.updateCompany
);
router.get(
  '/request/:userId/:companyId',
  authMiddleware.authenticateToken,
  RoleMiddleware.checkRole('company'),
  CompanyController.addUserCompanyStatus
);
router.post(
  '/request',
  authMiddleware.authenticateToken,
  CompanyController.requestToJoinCompany
);

export default router;
