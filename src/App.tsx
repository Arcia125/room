import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Provider } from './theme';
import { Loading } from './components/Loading';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeLoadable = (loader: any) =>
  Loadable({
    loader,
    loading: Loading,
  });

const LoadableHome = makeLoadable(() => import('./pages/Home'));

const LoadableLogin = makeLoadable(() => import('./pages/Login'));

const LoadableForgotPassword = makeLoadable(() =>
  import('./pages/ForgotPassword')
);

const LoadableRoom = makeLoadable(() => import('./pages/Room'));

const LoadableDashboard = makeLoadable(() => import('./pages/Dashboard'));

const LoadableAccount = makeLoadable(() => import('./pages/Account'));

const App = () => {
  return (
    <Provider>
      <Router>
        <Route path="/" component={LoadableHome} exact />
        <Route path="/login" component={LoadableLogin} />
        <Route
          path="/forgot-password"
          component={LoadableForgotPassword}
          exact
        />
        <Route
          path="/forgot-password/:token"
          component={LoadableForgotPassword}
        />
        <Route path="/r/:roomId" component={LoadableRoom} />
        <Route path="/dashboard" component={LoadableDashboard} />
        <Route path="/account" component={LoadableAccount} />
      </Router>
    </Provider>
  );
};

export default App;
