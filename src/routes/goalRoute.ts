import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware';
import { addGoal, fetchGoals, editGoal } from '../controller/goalcontroller';

const router = express.Router();

// Change the path to /api/goals to match the Swagger documentation
router.post('/', authMiddleware, addGoal); // POST /api/goals
router.get('/', authMiddleware, fetchGoals); // GET /api/goals
router.put('/:id', authMiddleware, editGoal); // PUT /api/goals/:id

export default router;

