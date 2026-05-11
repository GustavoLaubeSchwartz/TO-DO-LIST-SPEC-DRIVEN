const TaskModel = require('../models/taskModel');

const TaskController = {
  getAll(req, res) {
    const { status } = req.query;
    let tasks = TaskModel.getAll();

    if (status === 'completed') {
      tasks = tasks.filter(t => t.completed);
    } else if (status === 'pending') {
      tasks = tasks.filter(t => !t.completed);
    }

    res.json({ success: true, data: tasks });
  },

  getById(req, res) {
    const task = TaskModel.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }
    res.json({ success: true, data: task });
  },

  create(req, res) {
    const { title, description, reminder } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Título é obrigatório' });
    }
    if (title.length > 100) {
      return res.status(400).json({ success: false, message: 'Título deve ter no máximo 100 caracteres' });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ success: false, message: 'Descrição deve ter no máximo 500 caracteres' });
    }
    if (reminder && isNaN(Date.parse(reminder))) {
      return res.status(400).json({ success: false, message: 'Data do lembrete inválida' });
    }

    const task = TaskModel.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      reminder: reminder || null,
    });

    res.status(201).json({ success: true, data: task });
  },

  update(req, res) {
    const { title, description, completed, reminder } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Título é obrigatório' });
      }
      if (title.length > 100) {
        return res.status(400).json({ success: false, message: 'Título deve ter no máximo 100 caracteres' });
      }
    }
    if (description !== undefined && description.length > 500) {
      return res.status(400).json({ success: false, message: 'Descrição deve ter no máximo 500 caracteres' });
    }
    if (reminder !== undefined && reminder !== null && isNaN(Date.parse(reminder))) {
      return res.status(400).json({ success: false, message: 'Data do lembrete inválida' });
    }

    const data = {};
    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description.trim();
    if (completed !== undefined) data.completed = Boolean(completed);
    if (reminder !== undefined) data.reminder = reminder;

    const task = TaskModel.update(req.params.id, data);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }

    res.json({ success: true, data: task });
  },

  delete(req, res) {
    const deleted = TaskModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }
    res.json({ success: true, message: 'Tarefa removida com sucesso' });
  },

  getReminders(req, res) {
    const pending = TaskModel.getPendingReminders();
    pending.forEach(task => TaskModel.markReminderNotified(task.id));
    res.json({ success: true, data: pending });
  },
};

module.exports = TaskController;
