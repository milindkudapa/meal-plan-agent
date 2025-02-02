const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activity_level: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['sedentary', 'light', 'moderate', 'active', 'very_active']]
    }
  },
  desired_weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  goal_time_period: {
    type: DataTypes.INTEGER, // in weeks
    allowNull: false
  },
  geographical_region: {
    type: DataTypes.STRING,
    allowNull: false
  },
  food_preferences: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = User; 