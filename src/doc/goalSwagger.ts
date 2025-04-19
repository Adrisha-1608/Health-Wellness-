/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: User goal tracking
 */

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sleep early"
 *               description:
 *                 type: string
 *                 example: "Be in bed by 10 PM"
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-01"
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get user goals
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Goal ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */
