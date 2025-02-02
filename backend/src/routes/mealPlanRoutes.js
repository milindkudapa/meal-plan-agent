const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');

/**
 * @swagger
 * /api/mealplan:
 *   post:
 *     summary: Generate a new meal plan
 *     tags: [Meal Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               daily_log_id:
 *                 type: integer
 *             required:
 *               - daily_log_id
 *     responses:
 *       201:
 *         description: Meal plan generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meal plan generated successfully
 *                 mealPlan:
 *                   $ref: '#/components/schemas/MealPlan'
 *       400:
 *         description: Bad request - daily log ID is required or meal plan already exists
 *       404:
 *         description: Daily log not found
 *       500:
 *         description: Server error
 */
router.post('/', mealPlanController.generateMealPlan);

/**
 * @swagger
 * /api/mealplan/{daily_log_id}:
 *   get:
 *     summary: Get meal plan by daily log ID
 *     tags: [Meal Plans]
 *     parameters:
 *       - in: path
 *         name: daily_log_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Daily log ID
 *     responses:
 *       200:
 *         description: Meal plan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealPlan'
 *       404:
 *         description: Meal plan not found
 *       500:
 *         description: Server error
 */
router.get('/:daily_log_id', mealPlanController.getMealPlan);

/**
 * @swagger
 * /api/mealplan/{plan_id}:
 *   put:
 *     summary: Update meal plan
 *     tags: [Meal Plans]
 *     parameters:
 *       - in: path
 *         name: plan_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meal plan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_details:
 *                 type: object
 *             required:
 *               - plan_details
 *     responses:
 *       200:
 *         description: Meal plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meal plan updated successfully
 *                 mealPlan:
 *                   $ref: '#/components/schemas/MealPlan'
 *       404:
 *         description: Meal plan not found
 *       500:
 *         description: Server error
 */
router.put('/:plan_id', mealPlanController.updateMealPlan);

module.exports = router; 