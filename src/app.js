const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views', 'public')));

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public', 'index.html'));
});

module.exports = app;
