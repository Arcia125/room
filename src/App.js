import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import { client } from './apolloClient';
import Home from './pages/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Home></Home>
    </ApolloProvider>
  );
}

export default App;
