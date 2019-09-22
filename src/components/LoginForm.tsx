import React from 'react';

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  username: string;
  onChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
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

export { LoginForm };
