import React from 'react';
import PropTypes from 'prop-types';
import { LOGIN } from '../../graphql/login';
import { useMutation } from '@apollo/react-hooks';

const LoginForm = ({
  onSubmit,
  username,
  onChangeUsername,
  password,
  onChangePassword
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={username} onChange={onChangeUsername} />
      <input type="password" value={password} onChange={onChangePassword} />
      <button type="submit">login</button>
    </form>
  );
};

const defaultLoginOpts = { username: '', password: '' };

const useLoginForm = ({
  initialUsername = '',
  initialPassword = ''
} = defaultLoginOpts) => {
  const [username, setUsername] = React.useState(initialUsername);
  const [password, setPassword] = React.useState(initialPassword);

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);

  return {
    username,
    password,
    onChangeUsername,
    onChangePassword
  };
};

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
