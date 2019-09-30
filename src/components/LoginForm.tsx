import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from './styles/Button';

export interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  username: string;
  onChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledLoginForm = styled.form`
  display: grid;
  & a {
    text-decoration: none;
  }
  & .loginForm__inputs {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    & .loginForm__input {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 8px;
    }
  }
  & .loginForm__submit {
    display: grid;
  }
`;

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  onSubmit,
  username,
  onChangeUsername,
  password,
  onChangePassword,
}) => {
  return (
    <StyledLoginForm className="loginForm" onSubmit={onSubmit}>
      <div className="loginForm__inputs">
        <div className="loginForm__input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="loginForm__input">
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
      <div className="loginForm__submit">
        <Button color="primary" type="submit">
          login
        </Button>
        <p>
          <span>Need an account?</span>
          <Link to="/">Register</Link>
        </p>
      </div>
    </StyledLoginForm>
  );
};

export { LoginForm };
