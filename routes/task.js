const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task');

// Routes for sample entity
router.get('/', task_controller.get_all_tasks);
router.post('/', task_controller.create_task);
router.delete('/:task_id', task_controller.remove_task);
router.put('/:task_id', task_controller.update_task);

module.exports = router;
