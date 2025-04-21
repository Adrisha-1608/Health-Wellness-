import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware';
import { addGoal, fetchGoals, editGoal } from '../controller/goalcontroller';

const router = express.Router();

router.post('/', authMiddleware, addGoal); 
router.get('/', authMiddleware, fetchGoals); 
router.put('/:id', authMiddleware, editGoal);

export default router;

