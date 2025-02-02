const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const DailyLog = require('./dailyLogModel');

const MealPlan = sequelize.define('MealPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  daily_log_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DailyLog,
      key: 'id'
    }
  },
  plan_details: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  generated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

// Set up association
MealPlan.belongsTo(DailyLog, { foreignKey: 'daily_log_id' });
DailyLog.hasOne(MealPlan, { foreignKey: 'daily_log_id' });

module.exports = MealPlan; 