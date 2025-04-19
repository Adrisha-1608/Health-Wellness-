import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import notificationRoutes from './src/routes/notificationRoutes';
import { startNotificationConsumer } from './src/notifications/notificationConsumer';
import mongoose from 'mongoose';
import { connectDB } from './src/config/moongo';
import { restoreScheduledJobs } from './src/jobs/jobScheduler';
import userRoutes from './src/routes/userRoutes';
import goalRoutes from './src/routes/goalRoute';
import { setupSwagger } from './src/config/swagger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger';
import { logger } from './src/utils/logger';  // Importing the logger

dotenv.config();

// Connect to the database and restore scheduled jobs
connectDB().then(() => {
  restoreScheduledJobs(); // Restore persisted jobs from the database
  logger.info('Database connected and scheduled jobs restored.');
}).catch((error) => {
  logger.error('Database connection failed:', error);
});

const app = express();
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/user', userRoutes);  // Define user routes
app.use('/api/goals', goalRoutes);  // Define goal routes

// Setup Swagger
setupSwagger(app);

app.listen(5000, () => {
  logger.info('Server is running on port 5000');
  logger.info('Swagger docs available at http://localhost:5000/api-docs');
});

















// import express from 'express';
// import dotenv from 'dotenv';
// import authRoutes from './src/routes/authRoutes';
// import notificationRoutes from './src/routes/notificationRoutes';
// import { startNotificationConsumer } from './src/notifications/notificationConsumer';
// import mongoose from 'mongoose';
// import { connectDB } from './src/config/moongo';
// import { restoreScheduledJobs } from './src/jobs/jobScheduler';
// import userRoutes from './src/routes/userRoutes';
// import goalRoutes from './src/routes/goalRoute';
// import { setupSwagger } from './src/config/swagger'; 
// import swaggerUi from 'swagger-ui-express';
// import {swaggerSpec} from './src/config/swagger';


// dotenv.config();

// connectDB().then(() => {
//   restoreScheduledJobs(); // Restore persisted jobs
// });

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/user', userRoutes); 
// startNotificationConsumer();
// app.use('/api/goals', goalRoutes);

// setupSwagger(app);


// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
//   console.log('Swagger docs available at http://localhost:5000/api-docs');
// });
