const express = require('express');

const app = express();
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const faker = require('faker');
const moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/tasks', (req, res) => {
  const tasks = Array.from({ length: 30 }).map((_val, id) => ({
    id,
    title: faker.fake('{{lorem.sentence}}'),
    description: faker.fake('{{lorem.paragraph}}'),
    isCompleted: !!Math.round(Math.random()),
    dueDate: moment(faker.date.between('2021-01-22', '2021-02-03')).toISOString(),
  }));

  return res.send(tasks);
});

// app.post('/tasks', (req, res) => {
//   const task = new Task({ body: req.body.body, title: req.body.title });
//   task.save((err) => {
//     if (err) return res.status(404).send({ message: err.message });

//     return res.send({ task });
//   });
// });

// app.post('/tasks/:id', (req, res) => {
//   Task.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, task) => {
//     if (err) return res.status(404).send({ message: err.message });
//     return res.send({ message: 'task updated!', task });
//   });
// });

// app.delete('/tasks/:id', (req, res) => {
//   Task.findByIdAndRemove(req.params.id, (err) => {
//     if (err) return res.status(404).send({ message: err.message });
//     return res.send({ message: 'task deleted!' });
//   });
// });

const PORT = 5000;

app.listen(PORT);
console.log(`api running on port ${PORT}: `);
