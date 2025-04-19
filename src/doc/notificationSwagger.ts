/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification related routes
 */

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Send a notification to a user
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6622dd43458e6dbf57993fd2
 *               message:
 *                 type: string
 *                 example: "This is a notification message."
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request – userId or message is missing
 */
