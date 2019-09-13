import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.error(`[Network error]: `, networkError);
    }),
    new WebSocketLink({
      uri: 'ws://localhost:9001/graphql',
      credentials: 'same-origin',
      options: {
        reconnect: true
      }
    })
    // regular graphql queries work using only the link above, to set up a separate http endpoint, use the setup below
    // import { split } from 'apollo-link';
    // split(
    //   ({ query }) => {
    //     const mainDefinition = getMainDefinition(query);
    //     return true || (
    //       mainDefinition.kind === 'OperationDefinition' &&
    //       mainDefinition.operation === 'subscription'
    //     );
    //   },
    //   new WebSocketLink({
    //     uri: 'ws://localhost:9002/graphql',
    //     credentials: 'same-origin',
    //     options: {
    //       reconnect: true,
    //     },
    //   }),
    //   new HttpLink({
    //     uri: '/graphql',
    //     credentials: 'same-origin',
    //   })
    // ),
  ]),
  cache: new InMemoryCache()
});

const Provider = ({ children, ...restProps }) => (
  <ApolloProvider client={client} {...restProps}>
    {children}
  </ApolloProvider>
);

export { client, Provider };
