import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, '../client')
});

app.listen({ port: 5555 })
  .then(address => {
    console.log('App started at ', address)
  });