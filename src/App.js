import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home/';
import Room from './pages/Room/';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/r/:roomId" component={Room} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
