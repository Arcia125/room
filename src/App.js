import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/r/:roomId" component={Room} />
    </Router>
  );
};

export default App;
