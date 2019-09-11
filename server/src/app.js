import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './data/schema';

const server = new ApolloServer(schema);

const app = express();

app.get('/', function(req, res) {
  res.send('hello')
});

server.applyMiddleware({ app });

export { app };