import { Router } from 'express';
import { updateProfile, register, login, logout } from '../services/authService';
import { authMiddleware } from '../Middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.put('/update', authMiddleware, updateProfile); 
export default router;

