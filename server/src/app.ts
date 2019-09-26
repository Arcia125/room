import express from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress } from 'graphql-server-express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';

import config from '../config';
import { builtFrontendPath, indexHtmlPath } from './filePaths';
import { schema } from './data/schema';
import { connectDb } from './models';
import { validateToken, findUserByDecodedToken } from './utils/auth';

const app = express();

// Setup express static to serve static files from build directory.
app.use(express.static(builtFrontendPath));

// @ts-ignore
app.use(morgan(config.PRODUCTION === 'true' ? 'tiny' : 'dev'));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: `http://localhost:${config.PORT}${config.REACT_APP_GRAPHQL_HTTP_ENDPOINT}`,
  })
);

app.use(
  '/graphiql-subscriptions',
  graphiqlExpress({
    endpointURL: `ws://localhost:${config.PORT}${config.REACT_APP_GRAPHQL_WS_ENDPOINT}`,
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

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    console.log('Creating graphql http context. req.headers: ', req.headers);
    const token = req.headers.authorization;

    if (token) {
      return validateToken(token)
        .then(findUserByDecodedToken)
        .then(user => {
          console.log('authenticating user ', user);
          return {
            currentUser: user,
          };
        });
    }

    return {
      currentUser: null,
    };
  },
});

apolloServer.applyMiddleware({ app });

/**
 * @description Simple wrapper for app.listen() that creates and adds the graphql subscription server
 * @param  {...any} args args to be passed to app.listen
 */
const listen = async (...args: any[]) => {
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
      onConnect: (connectionParams: { headers: { Authorization: string } }) => {
        console.log('connectionParams', connectionParams);
        const authToken =
          connectionParams &&
          connectionParams.headers &&
          connectionParams.headers.Authorization;
        if (authToken) {
          // try {
          //   const decoded = jwt.verify(connectionParams.authToken, JWT_SECRET);
          // }
          return validateToken(authToken)
            .then(findUserByDecodedToken)
            .then(user => {
              console.log(user, ' connected');
              return {
                currentUser: user,
              };
            });
        }

        console.log('unauthenticated user connected');

        return {
          currentUser: null,
        };

        // throw new Error('Missing auth token!');
      },
    },
    {
      server: server,
      path: config.REACT_APP_GRAPHQL_WS_ENDPOINT,
    }
  );

  return { server, subscriptionServer, dbConnection };
};

export { app, listen };
