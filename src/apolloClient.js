import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: '/graphql'
});

const Provider = ({ children, ...restProps }) => (
  <ApolloProvider client={client} {...restProps}>
    {children}
  </ApolloProvider>
);

export { client, Provider };
