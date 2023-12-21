const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task');

// Routes for task entity

/**
 * @openapi
 * /api/task/:
 *   get:
 *     summary: Get all task data
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: first task
 *                 description: first desccription
 *                 status: In Progress
 *                 createdAt: '2023-12-21T15:30:20.000Z'
 *                 updatedAt: '2023-12-21T15:33:57.000Z'
 */
router.get('/', task_controller.get_all_tasks);

/**
 * @openapi
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with a title, description, and status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 required: true  
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 enum: [To Do, In Progress, Done]
 *                 required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *          application/json:
 *              example:
 *                  inserted_task_id: 1          
 */ 
router.post('/', task_controller.create_task);



/**
 * @openapi
 * /api/task/{task_id}:
 *  delete:
 *    summary: Remove a task by ID
 *    parameters:
 *      - in: path
 *        name: task_id
 *        required: true
 *        schema:
 *          type: integer
 *          description: The ID of the task to be removed
 *    responses:
 *      '200':
 *        description: Task deleted successfully
 *      '404':
 *        description: Task not found
 *      '500':
 *        description: Internal server error
 */
router.delete('/:task_id', task_controller.remove_task);


/**
 * @openapi
 * /api/task/{task_id}:
 *  put:
 *   summary: Update a task by ID
 *   parameters:
 *    - in: path
 *      name: task_id
 *      required: true
 *      schema:
 *       type: integer
 *       description: The ID of the task to be updated
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 enum: [To Do, In Progress, Done]
 *   responses:
 *     '200 ':
 *        description: Task updated successfully
 *     '404':
 *        description: Task not found
 *     '500':
 *        description: Internal server error
 */

router.put('/:task_id', task_controller.update_task);

module.exports = router;
