import amqp from 'amqplib';

export const startNotificationConsumer = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const content = msg.content.toString();
      const notification = JSON.parse(content);
      console.log('📨 Received notification:', notification);

      // Add your real notification handling logic here (email, push, etc.)

      channel.ack(msg);
    }
  });

  console.log('Notification consumer is running...');
};
