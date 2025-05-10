import { reminderJob } from './reminderJob';
import ScheduledJob from '../models/ScheduledJob';
import schedule from 'node-schedule'; 

// Store scheduled jobs to avoid duplicates
const scheduledJobs: { [key: string]: any } = {};

export const scheduleReminder = async (userId: string, type: string, time: string) => {
  const key = `${userId}-${type}`;

  // Avoid rescheduling the same job
  if (scheduledJobs[key]) {
    scheduledJobs[key].cancel();  // Cancel the existing job if any
  }

  // Schedule the new job at the specified ISO time
  const job = schedule.scheduleJob(new Date(time), async () => {
    try {
      await reminderJob(userId, type);  // Trigger the reminder job
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  });

  // Store the scheduled job in memory
  scheduledJobs[key] = job;

  // Persist the job configuration in the database
  await ScheduledJob.findOneAndUpdate(
    { userId, type },
    { userId, type, time },
    { upsert: true, new: true }
  );
};

// Restore the previously scheduled jobs from the database
export const restoreScheduledJobs = async () => {
  const jobs = await ScheduledJob.find({});
  jobs.forEach(job => {
    scheduleReminder(job.userId, job.type, job.time);  // Reschedule each job
  });
};
















