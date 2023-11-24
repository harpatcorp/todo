const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task_description: { type: String, required: true },
    due_date: Date,
    priority: { type: String, enum: ['Low', 'Medium', 'High'] },
    status: { type: String, enum: ['Pending', 'Completed', 'Overdue'] },
    attachments: [{ type: String }] // File paths
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;