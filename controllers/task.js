const { Task, Status, status_index, } = require('../models/task');
const { create_task_schema } = require('../schema/task')

const get_all_tasks = async (req, res) => {
  try {
    const samples = await Task.findAll();
    res.json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create_task = async (req, res) => {
  const { error, value } = create_task_schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const task = new Task({
    title: value.title,
    description: value.description,
    status: status_index.indexOf(value.status)
  });

  try {
    const new_task = await task.save();
    res.status(201).json({inserted_task_id:new_task.dataValues.id});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove_task = async (req, res) => {
  const task_id = req.params.task_id;

  try {
    const deleted_task = await Task.destroy({ where: { id: task_id } });
    if (!deleted_task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { get_all_tasks, create_task, remove_task };
