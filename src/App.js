import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home/';
import Room from './pages/Room/';
import { Provider } from './theme';

const App = () => {
  return (
    <Provider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/r/:roomId" component={Room} />
      </Router>
    </Provider>
  );
};

export default App;
