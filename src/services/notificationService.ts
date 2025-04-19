import { sendNotificationToQueue } from '../notifications/notificationProducer';
import { logger } from '../utils/logger';  // Import the logger

/**
 * Notify a user by sending a message to the notification queue.
 */
export const notifyUser = async (userId: string, message: string) => {
  const notification = {
    userId,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    // Log the notification details
    logger.info(`Sending notification to user ${userId}: ${message}`);

    // Send the notification to the queue
    await sendNotificationToQueue(notification.userId, notification.message);

    // Log after successful queue sending
    logger.info(`Notification sent to queue for user ${userId}`);
  } catch (error) {
    // Log error if sending notification fails
    if (error instanceof Error) {
      logger.error(`Error sending notification to user ${userId}: ${error.message}`);
    } else {
      logger.error(`Error sending notification to user ${userId}: ${String(error)}`);
    }
    throw new Error('Error sending notification');
  }
};




// import { sendNotificationToQueue } from '../notifications/notificationProducer';

// export const notifyUser = async (userId: string, message: string) => {
//   const notification = {
//     userId,
//     message,
//     timestamp: new Date().toISOString(),
//   };

//   await sendNotificationToQueue(notification.userId, notification.message);
//   ;
// };
