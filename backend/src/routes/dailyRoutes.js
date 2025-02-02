const express = require('express');
const router = express.Router();
const dailyController = require('../controllers/dailyController');

/**
 * @swagger
 * /api/daily:
 *   post:
 *     summary: Create a new daily log
 *     tags: [Daily Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyLog'
 *     responses:
 *       201:
 *         description: Daily log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Daily log created successfully
 *                 dailyLog:
 *                   $ref: '#/components/schemas/DailyLog'
 *       400:
 *         description: Bad request - missing required fields or log already exists
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/', dailyController.createDailyLog);

/**
 * @swagger
 * /api/daily:
 *   get:
 *     summary: Get daily log by date
 *     tags: [Daily Logs]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of the log (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Daily log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyLog'
 *       404:
 *         description: Daily log not found
 *       500:
 *         description: Server error
 */
router.get('/', dailyController.getDailyLog);

/**
 * @swagger
 * /api/daily/{logId}:
 *   put:
 *     summary: Update daily log
 *     tags: [Daily Logs]
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Daily log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyLog'
 *     responses:
 *       200:
 *         description: Daily log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Daily log updated successfully
 *                 dailyLog:
 *                   $ref: '#/components/schemas/DailyLog'
 *       404:
 *         description: Daily log not found
 *       500:
 *         description: Server error
 */
router.put('/:logId', dailyController.updateDailyLog);

module.exports = router; 