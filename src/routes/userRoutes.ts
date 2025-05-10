import express from 'express';
import { createJob, getUserJobs } from '../services/userService';
import { authMiddleware } from '../Middleware/authMiddleware';
const router = express.Router();

router.post('/job', authMiddleware, createJob);  
router.get('/jobs', authMiddleware, getUserJobs); 

export default router;
