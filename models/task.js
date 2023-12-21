const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Tasks', {
  title: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0, // 0 - To Do, 1 - In Progress, 2 - Done
  }

});

const Status = {
  TODO: 'To Do',
  IN_PROGRES: 'In Progres',
  DONE: 'Done',
};

const status_index = [
  Status.TODO,
  Status.IN_PROGRES,
  Status.DONE,
];

module.exports = {Task, status_index, Status};