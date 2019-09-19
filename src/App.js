import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Home from './pages/Home/';
import Room from './pages/Room/';
import { Provider } from './theme';
import Login from './pages/Login';
import { GET_CURRENT_USER } from './graphql/getCurrentUser';
import { CREATE_USER } from './graphql/createUser';
import { SAVE_USER } from './graphql/saveUser';
import Dashboard from './pages/Dashboard';

const App = () => {
  // const { loading, data, error } = useQuery(GET_CURRENT_USER);

  // console.log(data, createUserMutation);

  // if (loading || createUserMutation.loading) return 'Loading..';
  // if (error || createUserMutation.error) {
  //   const err = error || createUserMutation.error;
  //   return err && err.message;
  // }

  // if (!data.currentUser && !createUserMutation.called) {
  //   createUser();
  // }

  // console.log(data);

  return (
    <Provider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/r/:roomId" component={Room} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </Provider>
  );
};

export default App;
