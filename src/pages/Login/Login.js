import React from 'react';
import PropTypes from 'prop-types';

import { LOGIN } from '../../graphql/login';
import { useMutation } from '@apollo/react-hooks';
import { LoginForm } from '../../components/LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';

const useAuth = () => {
  const [executeLogin, loginMutation] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      // cache.writeData()
    }
  });

  const loginUser = ({ username, password }) => {
    executeLogin({ variables: { username, password } });
  };

  return {
    loginUser
  };
};

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
