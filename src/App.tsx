import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Room from './pages/Room';
import { Provider } from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import { logout } from './utils/user';
import { Button } from './components/styles/Button';

const App = () => {
  return (
    <Provider>
      <Router>
        <Button onClick={logout}>logout</Button>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/r/:roomId" component={Room} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/account" component={Account} />
      </Router>
    </Provider>
  );
};

export default App;
