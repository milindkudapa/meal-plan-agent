const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./userModel');

const FixedSupplement = sequelize.define('FixedSupplement', {
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
  supplement_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nutrient_info: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: true
});

// Set up association
FixedSupplement.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(FixedSupplement, { foreignKey: 'user_id' });

module.exports = FixedSupplement; 