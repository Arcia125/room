import React from 'react';
import styled from 'styled-components';

import { Button } from './styles/Button';
import { HelperText } from './styles/HelperText';
import { Input } from './styles/Input';
import { Link } from './styles/Link';

export interface ResetPasswordFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  password: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  repeatPassword: string;
  onChangeRepeatPassword: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}

const StyledResetPasswordForm = styled.form`
  display: grid;
  grid-gap: 16px;
  & .resetPasswordForm__inputs {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  & .resetPasswordForm__submit {
    display: grid;
    grid-gap: 8px;
    & button {
      height: 48px;
    }
  }
`;

const ResetPasswordForm: React.FunctionComponent<ResetPasswordFormProps> = ({
  onSubmit,
  password,
  onChangePassword,
  repeatPassword,
  onChangeRepeatPassword,
  disabled,
}) => {
  return (
    <StyledResetPasswordForm className="loginForm" onSubmit={onSubmit}>
      <div className="resetPasswordForm__inputs">
        <Input
          label="New Password"
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <Input
          label="Repeat Password"
          id="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={onChangeRepeatPassword}
          required
        />
      </div>
      <div className="resetPasswordForm__submit">
        <Button disabled={disabled} color="primary" type="submit">
          RESET PASSWORD
        </Button>
        <HelperText className="resetPasswordForm__helperText">
          <span>Need an account?</span>
          <Link to="/">Register</Link>
        </HelperText>
      </div>
    </StyledResetPasswordForm>
  );
};

export { ResetPasswordForm };
