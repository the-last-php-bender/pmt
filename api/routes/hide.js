import express from 'express';
import CompanyController from '../controllers/CompanyController.js';
import UserController from '../controllers/UserController.js';
import ProjectController from '../controllers/ProjectController.js';
import TaskControllers from '../controllers/TaskController.js';
import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import RoleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router();
//Auth
router.post('/login', AuthController.login);
router.get('/superadmin', CompanyController.createSuperadmin);

router.route('/company')
    .post(authMiddleware.authenticateToken, RoleMiddleware.checkRole('superadmin'), CompanyController.createCompany)
    .get(authMiddleware.authenticateToken,RoleMiddleware.checkRole('superadmin'),CompanyController.getCompany)
    .get(authMiddleware.authenticateToken,RoleMiddleware.checkRole('superadmin'),CompanyController.getUsers
)
router.route('/company/:id')
    .put(authMiddleware.authenticateToken,RoleMiddleware.checkRole('company'),CompanyController.updateCompany)

router.route('/user/company')
    .get(authMiddleware.authenticateToken,UserController.getUsersCompany)

router.route('/company/request/:userId/:companyId')
    .get(authMiddleware.authenticateToken,RoleMiddleware.checkRole('company'),CompanyController.addUserCompanyStatus)

router.route('/company/request')
    .post(authMiddleware.authenticateToken,CompanyController.requestToJoinCompany)

router.route('/user/signup')
    .post(UserController.createUser);

router.route('/usersRole')
     .put(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), UserController.updateUserRole)

router.route('/user')
    .get(authMiddleware.authenticateToken, UserController.getUserById)
    .put(authMiddleware.authenticateToken, UserController.updateUser)
    .delete(authMiddleware.authenticateToken, UserController.deleteUser);

router.route('/users')
    .get(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), UserController.getCompanyUsers)

router.route('/project')
    .post(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), ProjectController.createProject)
    .get(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), ProjectController.getProjects)

router.route('/project/:id')
    .get(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), ProjectController.getProjectById)
    .put(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), ProjectController.updateProject)
    .delete(authMiddleware.authenticateToken, RoleMiddleware.checkRole('company'), ProjectController.deleteProject);

router.route('/tasks')
    .post(authMiddleware.authenticateToken, RoleMiddleware.checkRole('lead'), TaskControllers.createTask)

router.route('/task/:id')
    .get(authMiddleware.authenticateToken, RoleMiddleware.checkRole('lead'), TaskControllers.getTaskById)
    .put(authMiddleware.authenticateToken, RoleMiddleware.checkRole('lead'), TaskControllers.updateTask)
    .delete(authMiddleware.authenticateToken, RoleMiddleware.checkRole('lead'), TaskControllers.deleteTask);

export default router;
