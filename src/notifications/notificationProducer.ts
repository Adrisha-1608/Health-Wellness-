import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = 'notifications';

export const sendNotificationToQueue = async (userId: string, message: string) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    const payload = JSON.stringify({ userId, message });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(payload));

    console.log(`Sent notification to queue: ${payload}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Failed to send notification to queue:', error);
  }
};
