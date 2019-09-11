import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './data/schema';
import { builtFrontendPath, indexHtmlPath } from './filePaths';

const server = new ApolloServer(schema);

const app = express();

server.applyMiddleware({ app });

app.use(express.static(builtFrontendPath));

app.get('/', function (req, res) {
  res.sendFile(indexHtmlPath);
});

export { app };