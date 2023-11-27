const User = require("../models/userModel");
const Task = require("../models/taskModel");

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_description:
 *                 type: string
 *               due_date:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added task
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Invalid input
 */
const addTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id);
        if (user == null) {
            res.status(404).json({
                "msg": "User does not found"
            })
        };

        const task = new Task(req.body);
        await task.save();
        res.status(201).json({
            "msg": "Task is added"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg": "Addind a task has some problem"
        });
    }
};

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved tasks
 *       '401':
 *         description: Unauthorized
 */
const readTask = async (req, res) => {
    try {
        const task = await Task.find({ "user_id": req.body.user_id });
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg": "Reading a task has some problem"
        });
    };
};

/**
 * @swagger
 * /task?task_id={task_id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_description:
 *                 type: string
 *               due_date:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated task
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */
const updateTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id);
        if (user == null) {
            res.status(404).json({
                "msg": "User does not found"
            })
        };
        const task = await Task.findByIdAndUpdate(req.query.task_id, req.body);
        console.log(task)
        if (task == null) {
            res.status(404).json({
                "msg": "Task does not found"
            });
        } else {
            res.status(201).json({
                "msg": "Task is updated"
            });
        }

    } catch (error) {
        res.status(400).json({
            "msg": "Updating a task has some problem"
        });
    }
};

/**
 * @swagger
 * /task?task_id={task_id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted task
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */
const deleteTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id);
        if (user == null) {
            res.status(404).json({
                "msg": "User does not found"
            })
        };
        const task = await Task.findByIdAndDelete(req.query.task_id);
        console.log(task)
        if (task == null) {
            res.status(404).json({
                "msg": "Task does not found"
            });
        } else {
            res.status(201).json({
                "msg": "Task is deleted"
            });
        }

    } catch (error) {
        res.status(400).json({
            "msg": "Deleting a task has some problem"
        });
    }
}

module.exports = {
    addTask,
    readTask,
    updateTask,
    deleteTask
};