import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import Todo from './Todo.mjs';
import { ObjectId } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = 'mongodb+srv://marfayaga:spel9n6heAtVw8wP@clusterhillel.s63wg.mongodb.net/todo?retryWrites=true&w=majority&appName=ClusterHillel';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', () => {
  console.log('DB error');
});

db.once('open', () => {
  console.log('DB opened');
});

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, '../client')
});

app.get('/list', async (req, res) => {
  try {
    const todoList = await Todo.find();
    return await res.send(todoList);
  }
  catch (err) {
    console.log('Error reading todo list', err);
    return await res.status(500).send(err);
  }
});

app.post('/list-item', async (req, res) => {
  const todoItem = new Todo({
    text: req.body
  });

  try {
    const todo = await todoItem.save();
    console.log('Todo is added', todo);
    return await res.send(todo._id);
  }
  catch (err) {
    console.log('Error creating a todo item', err);
    return await res.status(500).send(err);
  }
});

app.put('/list-item/:id', async (req, res) => {
  const { id } = req.params;
  const text = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(ObjectId.createFromHexString(id), { text });
    console.log('Todo is updated', todo);
    return await res.send(todo._id);
  }
  catch (err) {
    console.log('Error updating a todo item', err);
    return await res.status(500).send(err);
  }
});

app.delete('/list-item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.deleteOne({
      _id: ObjectId.createFromHexString(id)
    });
    console.log('Todo is deleted', todo);
    return await res.send(todo._id);
  }
  catch (err) {
    console.log('Error deleting a todo item', err);
    return await res.status(500).send(err);
  }
});

app.listen({ port: process.env.PORT || 5555, host: process.env.HOST || 'localhost' })
  .then(address => {
    console.log('App started at ', address)
  });