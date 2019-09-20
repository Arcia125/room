import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home/';
import Room from './pages/Room/';
import { Provider } from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
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
