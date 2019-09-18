import express from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress } from 'graphql-server-express';
import jwt from 'jsonwebtoken';

import { builtFrontendPath, indexHtmlPath } from './filePaths';
import { schema } from './data/schema';
import config from '../config';
import { connectDb } from './models';

const app = express();

// Setup express static to serve static files from build directory.
app.use(express.static(builtFrontendPath));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: `ws://localhost:${config.PORT}/graphql`,
  })
);
// app.get('/test', function(req, res) {
//   res.json({ test: 'test' });
// });

// Send basic htmlFile
app.get('*', function(req, res) {
  res.sendFile(indexHtmlPath);
});

// app.use('/graphiql', graphiqlExpress);

/**
 * @description Simple wrapper for app.listen() that creates and adds the graphql subscription server
 * @param  {...any} args args to be passed to app.listen
 */
const listen = async (...args) => {
  const dbConnection = connectDb();
  const server = app.listen(...args);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      // onOperation: (operation, webSocket) => {
      //   console.log(operation, webSocket);

      // },
      onConnect: (connectionParams, websocket) => {
        // if (connectionParams.authToken) {
        //   // try {
        //   //   const decoded = jwt.verify(connectionParams.authToken, JWT_SECRET);
        //   // }
        //   return validateToken(connectionParams.authToken)
        //     .then(findUser(connectionParams.authToken))
        //     .then(user => {
        //       return {
        //         currentUser: user,
        //       };
        //     });
        // } else {
        //   const user = {};
        //   const context = {
        //     currentUser: user,
        //   };
        // }
        // throw new Error('Missing auth token!');
      },
    },
    {
      server: server,
      path: '/graphql',
    }
  );

  return { server, subscriptionServer, dbConnection };
};

export { app, listen };
