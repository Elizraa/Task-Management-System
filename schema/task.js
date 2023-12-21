const Joi = require('joi');
const { status_index } = require('../models/task'); 


const create_task_schema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().valid(...status_index).required(),
  description: Joi.string()
});

module.exports = {
  create_task_schema,
};