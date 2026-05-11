const crypto = require('crypto');

const tasks = [];

const TaskModel = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find(task => task.id === id);
  },

  create({ title, description = '', reminder = null }) {
    const now = new Date().toISOString();
    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      reminder: reminder ? { datetime: reminder, notified: false } : null,
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(task);
    return task;
  },

  update(id, data) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return null;

    const task = tasks[index];

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.completed !== undefined) task.completed = data.completed;
    if (data.reminder !== undefined) {
      task.reminder = data.reminder ? { datetime: data.reminder, notified: false } : null;
    }
    task.updatedAt = new Date().toISOString();

    return task;
  },

  delete(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  getPendingReminders() {
    const now = new Date();
    return tasks.filter(
      task =>
        task.reminder &&
        !task.reminder.notified &&
        new Date(task.reminder.datetime) <= now
    );
  },

  markReminderNotified(id) {
    const task = tasks.find(t => t.id === id);
    if (task && task.reminder) {
      task.reminder.notified = true;
    }
  },
};

module.exports = TaskModel;
