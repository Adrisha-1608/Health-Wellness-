/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management routes
 */

/**
 * @swagger
 * /api/user/job:
 *   post:
 *     summary: Create a reminder job
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - time
 *             properties:
 *               type:
 *                 type: string
 *                 example: "drink_water"
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-18T17:00:00.000Z"  # ISO 8601 format
 *     responses:
 *       201:
 *         description: Job scheduled successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/user/jobs:
 *   get:
 *     summary: View scheduled jobs for a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 */
