const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SampleModel = sequelize.define('Sample', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = SampleModel;
