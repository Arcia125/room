import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';

import { LoginForm } from '../../components/LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const auth = useAuth();

  const {
    username,
    password,
    onChangeUsername,
    onChangePassword,
  } = useLoginForm();

  if (auth.currentUser) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    auth.loginUser({ username, password });
  };

  return (
    <div>
      <LoginForm
        onSubmit={onSubmit}
        username={username}
        onChangeUsername={onChangeUsername}
        password={password}
        onChangePassword={onChangePassword}
      />
    </div>
  );
};

Login.propTypes = {};

export default Login;
