import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './styles/Button';

export interface LoginFormProps {
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
  onChangePassword,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="loginForm__inputs">
        <div className="loginForm__username">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="loginForm__password">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      <Button color="primary" type="submit">
        login
      </Button>
      <p>
        <span>Need an account?</span>
        <Link to="/">Register</Link>
      </p>
    </form>
  );
};

export { LoginForm };
