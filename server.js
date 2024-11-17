const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

const tasks = { pending: [], completed: [] };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/todo', (req, res) => {
  const allTasks = [...tasks.pending, ...tasks.completed.map(task => ({ ...task, done: true }))];
  res.status(200).send(allTasks);
});

app.post('/todo', (req, res) => {
  const { text } = req.body;
  tasks.pending.push({ id: Date.now().toString(), text });
  res.status(201).send({ message: "Task added successfully" });
});

app.patch('/todo/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.pending.findIndex(task => task.id === id);
  if (index !== -1) {
    const [completedTask] = tasks.pending.splice(index, 1);
    tasks.completed.push(completedTask);
    res.status(200).send({ message: "Task marked as completed" });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
