import React from 'react';
import styled from 'styled-components';

import { Button } from './styles/Button';
import { HelperText } from './styles/HelperText';
import { Input } from './styles/Input';
import { Link } from './styles/Link';

export interface ForgotPasswordFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  email: string;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  error?: React.ReactNode;
}

const StyledForgotPasswordForm = styled.form`
  display: grid;
  grid-gap: 16px;
  & .forgotPasswordForm__inputs {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  & .forgotPasswordForm__submit {
    display: grid;
    grid-gap: 8px;
    & button {
      height: 48px;
    }
  }
`;

const ForgotPasswordForm: React.FunctionComponent<ForgotPasswordFormProps> = ({
  onSubmit,
  email,
  onChangeEmail,
  disabled,
  error,
}) => {
  return (
    <StyledForgotPasswordForm className="loginForm" onSubmit={onSubmit}>
      <div className="forgotPasswordForm__inputs">
        <Input
          label="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      {error}
      <div className="forgotPasswordForm__submit">
        <Button disabled={disabled} color="primary" type="submit">
          SEND RECOVERY EMAIL
        </Button>
        <HelperText className="forgotPasswordForm__helperText">
          <span>Need an account?</span>
          <Link to="/">Register</Link>
        </HelperText>
      </div>
    </StyledForgotPasswordForm>
  );
};

export { ForgotPasswordForm };
