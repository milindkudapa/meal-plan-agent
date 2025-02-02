const FixedSupplement = require('../models/fixedSupplementModel');
const User = require('../models/userModel');

const supplementController = {
  // Add a new fixed supplement
  async addSupplement(req, res) {
    try {
      const {
        user_id,
        supplement_name,
        nutrient_info
      } = req.body;

      // Validate required fields
      if (!user_id || !supplement_name || !nutrient_info) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      // Check if user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if supplement already exists for this user
      const existingSupplement = await FixedSupplement.findOne({
        where: {
          user_id,
          supplement_name
        }
      });

      if (existingSupplement) {
        return res.status(400).json({ error: 'Supplement already exists for this user' });
      }

      // Create new supplement
      const supplement = await FixedSupplement.create({
        user_id,
        supplement_name,
        nutrient_info
      });

      res.status(201).json({
        message: 'Supplement added successfully',
        supplement
      });
    } catch (error) {
      console.error('Error adding supplement:', error);
      res.status(500).json({ error: 'Failed to add supplement' });
    }
  },

  // Get all supplements for a user
  async getUserSupplements(req, res) {
    try {
      const { user_id } = req.params;

      const supplements = await FixedSupplement.findAll({
        where: { user_id },
        order: [['created_at', 'DESC']]
      });

      res.json(supplements);
    } catch (error) {
      console.error('Error fetching supplements:', error);
      res.status(500).json({ error: 'Failed to fetch supplements' });
    }
  },

  // Update a supplement
  async updateSupplement(req, res) {
    try {
      const { supplement_id } = req.params;
      const updates = req.body;

      const supplement = await FixedSupplement.findByPk(supplement_id);
      if (!supplement) {
        return res.status(404).json({ error: 'Supplement not found' });
      }

      await supplement.update(updates);
      res.json({
        message: 'Supplement updated successfully',
        supplement
      });
    } catch (error) {
      console.error('Error updating supplement:', error);
      res.status(500).json({ error: 'Failed to update supplement' });
    }
  },

  // Delete a supplement
  async deleteSupplement(req, res) {
    try {
      const { supplement_id } = req.params;

      const supplement = await FixedSupplement.findByPk(supplement_id);
      if (!supplement) {
        return res.status(404).json({ error: 'Supplement not found' });
      }

      await supplement.destroy();
      res.json({ message: 'Supplement deleted successfully' });
    } catch (error) {
      console.error('Error deleting supplement:', error);
      res.status(500).json({ error: 'Failed to delete supplement' });
    }
  }
};

module.exports = supplementController; 