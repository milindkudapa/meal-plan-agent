const DailyLog = require('../models/dailyLogModel');
const User = require('../models/userModel');

const dailyController = {
  // Create a new daily log
  async createDailyLog(req, res) {
    try {
      const {
        user_id,
        expected_activity_level,
        sleep_score,
        resting_heart_rate,
        date
      } = req.body;

      // Validate required fields
      if (!user_id || !expected_activity_level || !sleep_score || !resting_heart_rate) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      // Check if user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if log already exists for this date
      const existingLog = await DailyLog.findOne({
        where: {
          user_id,
          date: date || new Date()
        }
      });

      if (existingLog) {
        return res.status(400).json({ error: 'Daily log already exists for this date' });
      }

      // Create new daily log
      const dailyLog = await DailyLog.create({
        user_id,
        expected_activity_level,
        sleep_score,
        resting_heart_rate,
        date: date || new Date()
      });

      res.status(201).json({
        message: 'Daily log created successfully',
        dailyLog
      });
    } catch (error) {
      console.error('Error creating daily log:', error);
      res.status(500).json({ error: 'Failed to create daily log' });
    }
  },

  // Get daily log by date
  async getDailyLog(req, res) {
    try {
      const { user_id, date } = req.query;

      if (!user_id || !date) {
        return res.status(400).json({ error: 'User ID and date are required' });
      }

      const dailyLog = await DailyLog.findOne({
        where: {
          user_id,
          date
        }
      });

      if (!dailyLog) {
        return res.status(404).json({ error: 'Daily log not found' });
      }

      res.json(dailyLog);
    } catch (error) {
      console.error('Error fetching daily log:', error);
      res.status(500).json({ error: 'Failed to fetch daily log' });
    }
  },

  // Update daily log
  async updateDailyLog(req, res) {
    try {
      const { logId } = req.params;
      const updates = req.body;

      const dailyLog = await DailyLog.findByPk(logId);
      if (!dailyLog) {
        return res.status(404).json({ error: 'Daily log not found' });
      }

      await dailyLog.update(updates);
      res.json({ message: 'Daily log updated successfully', dailyLog });
    } catch (error) {
      console.error('Error updating daily log:', error);
      res.status(500).json({ error: 'Failed to update daily log' });
    }
  }
};

module.exports = dailyController; 