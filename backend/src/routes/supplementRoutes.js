const express = require('express');
const router = express.Router();
const supplementController = require('../controllers/supplementController');

/**
 * @swagger
 * /api/supplements:
 *   post:
 *     summary: Add a new supplement
 *     tags: [Supplements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplement'
 *     responses:
 *       201:
 *         description: Supplement added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Supplement added successfully
 *                 supplement:
 *                   $ref: '#/components/schemas/Supplement'
 *       400:
 *         description: Bad request - missing required fields or supplement already exists
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/', supplementController.addSupplement);

/**
 * @swagger
 * /api/supplements/user/{user_id}:
 *   get:
 *     summary: Get all supplements for a user
 *     tags: [Supplements]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of supplements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplement'
 *       500:
 *         description: Server error
 */
router.get('/user/:user_id', supplementController.getUserSupplements);

/**
 * @swagger
 * /api/supplements/{supplement_id}:
 *   put:
 *     summary: Update a supplement
 *     tags: [Supplements]
 *     parameters:
 *       - in: path
 *         name: supplement_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplement'
 *     responses:
 *       200:
 *         description: Supplement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Supplement updated successfully
 *                 supplement:
 *                   $ref: '#/components/schemas/Supplement'
 *       404:
 *         description: Supplement not found
 *       500:
 *         description: Server error
 */
router.put('/:supplement_id', supplementController.updateSupplement);

/**
 * @swagger
 * /api/supplements/{supplement_id}:
 *   delete:
 *     summary: Delete a supplement
 *     tags: [Supplements]
 *     parameters:
 *       - in: path
 *         name: supplement_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplement ID
 *     responses:
 *       200:
 *         description: Supplement deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Supplement deleted successfully
 *       404:
 *         description: Supplement not found
 *       500:
 *         description: Server error
 */
router.delete('/:supplement_id', supplementController.deleteSupplement);

module.exports = router; 