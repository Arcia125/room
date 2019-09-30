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
  grid-gap: 16px;
  & a {
    text-decoration: none;
    color: ${p => p.theme.colors.blueLink};
  }
  & label {
    color: #bdbdbd;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
  }
  & input {
    border: none;
    height: 48px;
    border-radius: 2px;
  }
  & button {
    cursor: pointer;
    font-size: 16px;
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
    grid-gap: 8px;
    & button {
      height: 48px;
    }
  }
  & .loginForm__helperText {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 8px;
    font-size: 16px;
    color: #aeb3c8;
  }
  a.loginForm__helperText {
    color: ${p => p.theme.colors.blueLink};
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
          <Link className="loginForm__helperText" to="/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="loginForm__submit">
        <Button color="primary" type="submit">
          login
        </Button>
        <p className="loginForm__helperText">
          <span>Need an account?</span>
          <Link to="/">Register</Link>
        </p>
      </div>
    </StyledLoginForm>
  );
};

export { LoginForm };
