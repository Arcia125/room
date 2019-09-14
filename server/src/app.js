import express from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress } from 'graphql-server-express';

import { builtFrontendPath, indexHtmlPath } from './filePaths';
import { schema } from './data/schema';
import { PORT } from '../config';

const app = express();

// Setup express static to serve static files from build directory.
app.use(express.static(builtFrontendPath));

app.use('/graphiql', graphiqlExpress({
  endpointURL: `ws://localhost:${PORT}/graphql`,
}));

// Send basic htmlFile
app.get('/', function(req, res) {
  res.sendFile(indexHtmlPath);
});

// app.use('/graphiql', graphiqlExpress);

/**
 * @description Simple wrapper for app.listen() that creates and adds the graphql subscription server
 * @param  {...any} args args to be passed to app.listen
 */
const listen = (...args) => {
  const server = app.listen(...args);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: server,
      path: '/graphql',
    }
  );

  return { server, subscriptionServer };
};

export { app, listen };
