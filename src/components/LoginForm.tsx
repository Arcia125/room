import React from 'react';
import styled from 'styled-components';

import { Button } from './styles/Button';
import { HelperText } from './styles/HelperText';
import { Input } from './styles/Input';
import { Link } from './styles/Link';

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
  & .loginForm__inputs {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  & .loginForm__submit {
    display: grid;
    grid-gap: 8px;
    & button {
      height: 48px;
    }
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
        <Input
          label="Username"
          id="username"
          value={username}
          onChange={onChangeUsername}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
        >
          <Link to="/forgot-password">Forgot your password?</Link>
        </Input>
      </div>

      <div className="loginForm__submit">
        <Button color="primary" type="submit">
          login
        </Button>

        <HelperText>
          <span>Need an account?</span>
          <Link to="/">Register</Link>
        </HelperText>
      </div>
    </StyledLoginForm>
  );
};

export { LoginForm };
