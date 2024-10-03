import express from 'express';
import companyRoutes from './companyRoutes.js';
import userRoutes from './userRoutes.js';
import projectRoutes from './projectRoutes.js';
import taskRoutes from './taskRoutes.js';
import commentRoutes from './commentRoutes.js'
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/company', companyRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/task', taskRoutes);
router.use('/comments',commentRoutes)

export default router;
