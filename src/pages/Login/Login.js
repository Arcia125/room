import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  onSubmit,
  userName,
  onChangeUserName,
  password,
  onChangePassword
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={userName} onChange={onChangeUserName} />
      <input type="password" value={password} onChange={onChangePassword} />
      <button type="submit">login</button>
    </form>
  );
};

const Login = props => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSubmit = e => e.preventDefault();
  const onChangeUserName = e => setUserName(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  return (
    <div>
      <LoginForm
        onSubmit={onSubmit}
        userName={userName}
        onChangeUserName={onChangeUserName}
        password={password}
        onChangePassword={onChangePassword}
      />
    </div>
  );
};

Login.propTypes = {};

export default Login;
