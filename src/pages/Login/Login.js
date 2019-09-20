import React from 'react';
import PropTypes from 'prop-types';

import { LoginForm } from '../../components/LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ history }) => {
  const auth = useAuth();

  const {
    username,
    password,
    onChangeUsername,
    onChangePassword
  } = useLoginForm();

  if (auth.currentUser) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmit = e => {
    e.preventDefault();
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
