import React from 'react';
import PropTypes from 'prop-types';

import { LoginForm } from '../../components/LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';

const Login = props => {
  const auth = useAuth();

  const {
    username,
    password,
    onChangeUsername,
    onChangePassword
  } = useLoginForm();

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
