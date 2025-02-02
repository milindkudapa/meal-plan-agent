const User = require('../models/userModel');
const DailyLog = require('../models/dailyLogModel');
const MealPlan = require('../models/mealPlanModel');
const { Op } = require('sequelize');

const userController = {
  // List all users with optional filtering
  async listUsers(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        activity_level,
        region,
        weight_range,
        age_range 
      } = req.query;

      const where = {};
      
      if (activity_level) {
        where.activity_level = activity_level;
      }
      if (region) {
        where.geographical_region = region;
      }
      if (weight_range) {
        const [min, max] = weight_range.split('-');
        where.weight = { [Op.between]: [min, max] };
      }
      if (age_range) {
        const [min, max] = age_range.split('-');
        where.age = { [Op.between]: [min, max] };
      }

      const users = await User.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        users: users.rows,
        total: users.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(users.count / limit)
      });
    } catch (error) {
      console.error('Error listing users:', error);
      res.status(500).json({ error: 'Failed to list users' });
    }
  },

  // Register a new user
  async registerUser(req, res) {
    try {
      const {
        height,
        weight,
        age,
        activity_level,
        desired_weight,
        goal_time_period,
        geographical_region,
        food_preferences
      } = req.body;

      // Validate required fields
      if (!height || !weight || !age || !activity_level || !desired_weight || !goal_time_period || !geographical_region) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      // Create new user
      const user = await User.create({
        height,
        weight,
        age,
        activity_level,
        desired_weight,
        goal_time_period,
        geographical_region,
        food_preferences: food_preferences || {}
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          height,
          weight,
          age,
          activity_level,
          desired_weight,
          goal_time_period,
          geographical_region,
          food_preferences
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  },

  // Get user profile
  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  },

  // Update user profile
  async updateUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update(updates);
      res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  },

  // Delete user and all associated data
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.json({ message: 'User and associated data deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  // Get user statistics and progress
  async getUserStats(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get daily logs for the past 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentLogs = await DailyLog.findAll({
        where: {
          user_id: userId,
          date: {
            [Op.gte]: thirtyDaysAgo
          }
        },
        order: [['date', 'ASC']]
      });

      // Get recent meal plans
      const recentMealPlans = await MealPlan.findAll({
        include: [{
          model: DailyLog,
          where: { user_id: userId },
          required: true
        }],
        limit: 5,
        order: [['createdAt', 'DESC']]
      });

      // Calculate statistics
      const stats = {
        totalDaysLogged: recentLogs.length,
        averageSleepScore: recentLogs.reduce((acc, log) => acc + log.sleep_score, 0) / recentLogs.length,
        averageHeartRate: recentLogs.reduce((acc, log) => acc + log.resting_heart_rate, 0) / recentLogs.length,
        activityLevelBreakdown: recentLogs.reduce((acc, log) => {
          acc[log.expected_activity_level] = (acc[log.expected_activity_level] || 0) + 1;
          return acc;
        }, {}),
        recentMealPlans: recentMealPlans.map(plan => ({
          date: plan.createdAt,
          totalCalories: plan.plan_details.totalCalories,
          macronutrients: plan.plan_details.macronutrients
        }))
      };

      res.json({
        user,
        stats,
        recentLogs: recentLogs.map(log => ({
          date: log.date,
          sleep_score: log.sleep_score,
          resting_heart_rate: log.resting_heart_rate,
          activity_level: log.expected_activity_level
        }))
      });
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      res.status(500).json({ error: 'Failed to fetch user statistics' });
    }
  }
};

module.exports = userController; 