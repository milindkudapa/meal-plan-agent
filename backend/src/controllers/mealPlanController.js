const MealPlan = require('../models/mealPlanModel');
const DailyLog = require('../models/dailyLogModel');
const User = require('../models/userModel');
const { generateMealPlan } = require('../utils/openaiClient');

const mealPlanController = {
  // Generate and save a new meal plan
  async generateMealPlan(req, res) {
    try {
      const { daily_log_id } = req.body;

      // Validate required fields
      if (!daily_log_id) {
        return res.status(400).json({ error: 'Daily log ID is required' });
      }

      // Get daily log with user data
      const dailyLog = await DailyLog.findByPk(daily_log_id, {
        include: [{ model: User }]
      });

      if (!dailyLog) {
        return res.status(404).json({ error: 'Daily log not found' });
      }

      // Check if meal plan already exists for this daily log
      const existingPlan = await MealPlan.findOne({
        where: { daily_log_id }
      });

      if (existingPlan) {
        return res.status(400).json({ error: 'Meal plan already exists for this daily log' });
      }

      // Get previous meal plans for context (optional)
      const previousPlans = await MealPlan.findAll({
        include: [{
          model: DailyLog,
          where: { user_id: dailyLog.user_id },
          required: true
        }],
        limit: 3,
        order: [['createdAt', 'DESC']]
      });

      // Generate meal plan using OpenAI
      const generatedPlan = await generateMealPlan(
        dailyLog.User,
        dailyLog,
        previousPlans
      );

      // Save meal plan
      const mealPlan = await MealPlan.create({
        daily_log_id,
        plan_details: generatedPlan,
        generated_at: new Date()
      });

      res.status(201).json({
        message: 'Meal plan generated successfully',
        mealPlan
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      res.status(500).json({ error: 'Failed to generate meal plan' });
    }
  },

  // Get meal plan by daily log ID
  async getMealPlan(req, res) {
    try {
      const { daily_log_id } = req.params;

      const mealPlan = await MealPlan.findOne({
        where: { daily_log_id },
        include: [{
          model: DailyLog,
          include: [{ model: User }]
        }]
      });

      if (!mealPlan) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      res.json(mealPlan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
  },

  // Update meal plan
  async updateMealPlan(req, res) {
    try {
      const { plan_id } = req.params;
      const { plan_details } = req.body;

      const mealPlan = await MealPlan.findByPk(plan_id);
      if (!mealPlan) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      await mealPlan.update({
        plan_details,
        generated_at: new Date()
      });

      res.json({
        message: 'Meal plan updated successfully',
        mealPlan
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      res.status(500).json({ error: 'Failed to update meal plan' });
    }
  }
};

module.exports = mealPlanController; 