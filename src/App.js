import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home/';
import Room from './pages/Room/';
import { Provider } from './theme';
import Login from './pages/Login';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from './graphql/getCurrentUser';

const App = () => {
  const { loading, data, error } = useQuery(GET_CURRENT_USER);
  console.log(data);
  return (
    <Provider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/r/:roomId" component={Room} />
      </Router>
    </Provider>
  );
};

export default App;
