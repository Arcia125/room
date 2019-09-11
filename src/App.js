import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { client } from './apolloClient';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/r/:roomId" component={Room} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
