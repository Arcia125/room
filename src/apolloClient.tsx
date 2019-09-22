import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { typeDefs } from './typeDefs';
import { webSocketUri, httpUri } from './urls';
import { resolvers } from './resolvers';
import { getToken } from './utils/user';

console.log(`webSocketUri = ${webSocketUri}`);
console.log(`httpUri = ${httpUri}`);

const authHeaders = () => {
  const token = getToken();

  console.log(`getting token for auth headers ${token}`);

  return {
    Authorization: token ? `Bearer ${token}` : ''
  };
};

const websocketLink = new WebSocketLink({
  uri: webSocketUri,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      return {
        headers: {
          ...authHeaders()
        }
      };
    }
  }
});

const httpLink = new HttpLink({
  uri: httpUri,
  credentials: 'same-origin',
  headers: {
    ...authHeaders()
  }
});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.error(`[Network error]: `, networkError);
  }),
  // websocketLink,
  // regular graphql queries work using only the link above, to set up a separate http endpoint, use the setup below
  split(
    ({ query }) => {
      const mainDefinition = getMainDefinition(query);
      return (
        mainDefinition.kind === 'OperationDefinition' &&
        mainDefinition.operation === 'subscription'
      );
    },
    websocketLink,
    httpLink
    // new WebSocketLink({
    //   uri: 'ws://localhost:9002/graphql',
    //   credentials: 'same-origin',
    //   options: {
    //     reconnect: true,
    //   },
    // }),
  )
]);

const options = {
  connectToDevTools: true,
  resolvers: resolvers.resolvers,
  // clientState: resolvers,
  typeDefs,
  link,
  cache: new InMemoryCache()
};

const client = new ApolloClient(options);

const Provider: React.FunctionComponent<{ children: ReactElement }> = ({
  children,
  ...restProps
}) => (
  <ApolloProvider client={client} {...restProps}>
    {children}
  </ApolloProvider>
);

export { client, Provider };
