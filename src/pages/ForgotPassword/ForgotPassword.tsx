import React, { FunctionComponent } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import styled from 'styled-components';

import { ForgotPasswordForm } from '../../components/ForgotPasswordForm';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { useResetPasswordForm } from '../../hooks/useResetPasswordForm';
import { HelperText } from '../../components/styles/HelperText';

const StyledForgotPassword = styled.div`
  background-color: ${p => p.theme.colors.lightPurple};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .forgotPasswordPage {
    display: grid;
    grid-gap: 32px;
    width: 348px;
    max-width: 90vw;
    &__invite {
      font-family: 'Poppins', sans-serif;
      font-size: 2.58rem;
      line-height: 1.5;
      text-align: center;
    }
    & .error {
      color: red;
    }
  }
`;

const ForgotPassword: FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { token } = useParams<{ token: string }>();

  const auth = useAuth();

  const { email, onChangeEmail } = useForgotPasswordForm();

  const {
    password,
    onChangePassword,
    repeatPassword,
    onChangeRepeatPassword,
  } = useResetPasswordForm();

  if (auth.currentUser) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmitForgotPasswordForm: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    auth.sendForgotPassword({ email });
  };

  const onSubmitResetPasswordForm: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    auth.sendResetPassword({ password, repeatPassword, recoveryToken: token });
  };

  console.log('token', token);

  console.log('auth.resetPasswordMutation ', auth.resetPasswordMutation);

  const content = token ? (
    <>
      <p className="forgotPasswordPage__invite">Create a New Password</p>
      {auth.resetPasswordMutation.error && (
        <HelperText className="error">
          {auth.resetPasswordMutation.error.message}
        </HelperText>
      )}
      <ResetPasswordForm
        password={password}
        onChangePassword={onChangePassword}
        repeatPassword={repeatPassword}
        onChangeRepeatPassword={onChangeRepeatPassword}
        onSubmit={onSubmitResetPasswordForm}
      />
    </>
  ) : (
    <>
      <p className="forgotPasswordPage__invite">Recover Password</p>
      <ForgotPasswordForm
        onSubmit={onSubmitForgotPasswordForm}
        email={email}
        onChangeEmail={onChangeEmail}
      />
    </>
  );

  return (
    <StyledForgotPassword>
      <Navbar />
      <div className="forgotPasswordPage">{content}</div>
    </StyledForgotPassword>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
