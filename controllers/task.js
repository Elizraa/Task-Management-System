const { Task, Status, status_index, } = require('../models/task');
const { create_task_schema, update_task_schema } = require('../schemas/task')

const get_all_tasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const mapped_status_tasks = tasks.map(task => ({
      ...task.dataValues,
      status: status_index[task.dataValues.status],
    }));
    
    res.json(mapped_status_tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create_task = async (req, res) => {
  try {
    const { error, value } = create_task_schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const task = new Task({
      title: value.title,
      description: value.description,
      status: status_index.indexOf(value.status)
    });

    const new_task = await task.save();
    res.status(201).json({inserted_task_id:new_task.dataValues.id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove_task = async (req, res) => {
  try {
    const task_id = req.params.task_id;

    const deleted_task = await Task.destroy({ where: { id: task_id } });
    if (!deleted_task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update_task = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const { error, value } = update_task_schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (value.title) task.title = value.title;
    if (value.description != undefined) task.description = value.description;
    if (value.status !== undefined) task.status = status_index.indexOf(value.status);

    await task.save();
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { get_all_tasks, create_task, remove_task, update_task };
