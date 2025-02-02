const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./userModel');

const DailyLog = sequelize.define('DailyLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  expected_activity_level: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['sedentary', 'light', 'moderate', 'active', 'very_active']]
    }
  },
  sleep_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  resting_heart_rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 30,
      max: 200
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date']
    }
  ]
});

// Set up association
DailyLog.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(DailyLog, { foreignKey: 'user_id' });

module.exports = DailyLog; 