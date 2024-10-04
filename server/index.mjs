import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

let todoList = [];

app.register(fastifyStatic, {
  root: path.join(__dirname, '../client')
});

app.get('/list', (req, res) => {
  return res.send(todoList);
});

app.post('/list-item', (req, res) => {
  const todoItem = {
    id: 'id' + Date.now(),
    text: req.body
  };

  todoList.push(todoItem);
  return res.send(todoItem.id);
});

app.put('/list-item/:id', (req, res) => {
  const { id } = req.params;
  const text = req.body;
  const todoItem = todoList.find(item => item.id === id);
  if (todoItem) {
    todoItem.text = text;
    return res.send(todoItem.id);  
  }

  return res.statusCode(400).send('No such todo item ', id);
});

app.delete('/list-item/:id', (req, res) => {
  const { id } = req.params;
  const todoItem = todoList.find(item => item.id === id);
  if (todoItem) {
    todoList = todoList.filter(item => item.id !== id);
    return res.send(todoItem.id);  
  }

  return res.statusCode(400).send('No such todo item ', id);
});

app.listen({ port: 5555 })
  .then(address => {
    console.log('App started at ', address)
  });