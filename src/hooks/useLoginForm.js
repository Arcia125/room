import React from 'react';

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

export { useLoginForm };
