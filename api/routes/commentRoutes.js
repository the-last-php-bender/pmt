import express from 'express';
import CommentController from '../controllers/CommentController.js'; 
import auth from '../middleware/authMiddleware.js'; 
const router = express.Router();


router.post('/', auth.authenticateToken, CommentController.createComment);
router.put('/:commentId', auth.authenticateToken, CommentController.updateComment);
router.delete('/:commentId', auth.authenticateToken, CommentController.deleteComment);

export default router;
