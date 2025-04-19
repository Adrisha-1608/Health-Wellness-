import { sendNotificationToQueue } from '../notifications/notificationProducer';
import schedule from 'node-schedule';  

// This function sends a reminder notification to the user
export const reminderJob = async (userId: string, type: string) => {
  const message = `Hey! Time for your ${type} reminder.`;
  await sendNotificationToQueue(userId, message);
};

// Scheduling function using ISO 8601 time format
const scheduleJob = (time: string) => {
  try {
    // Schedule the job using the ISO time string
    const job = schedule.scheduleJob(new Date(time), async () => {
      const userId = 'global'; 
      const type = 'hydration'; // Type of reminder
      await reminderJob(userId, type);  // Call the reminder job function
    });

    console.log(`Scheduled job for userId 'global' with reminder type 'hydration' at ${time}`);
  } catch (error) {
    console.error(`Failed to schedule reminder job:`, error);
  }
};

// Example of scheduling a job using an ISO formatted time
scheduleJob('2025-04-18T17:00:00.000Z');  // This is where the job will run






