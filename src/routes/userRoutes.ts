import express from 'express';
import { createJob, getUserJobs } from '../services/userService';
import { authMiddleware } from '../Middleware/authMiddleware';
const router = express.Router();

// Define routes for creating and fetching jobs
router.post('/job', authMiddleware, createJob);  // POST: Create a job
router.get('/jobs', authMiddleware, getUserJobs);  // GET: Fetch all user jobs

export default router;
