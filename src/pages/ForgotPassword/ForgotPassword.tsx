import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';

import { ForgotPasswordForm } from '../../components/ForgotPasswordForm';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { useResetPasswordForm } from '../../hooks/useResetPasswordForm';
import { HelperText } from '../../components/styles/HelperText';

const StyledForgotPassword = styled.div`
  background-color: ${p => p.theme.colors.lighterPurple};
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
    & .success {
      color: ${p => p.theme.colors.purple};
      font-size: 1.5rem;
    }
  }
`;

const ResetPasswordContent = ({
  data,
  loading,
  error,
  password,
  onChangePassword,
  repeatPassword,
  onChangeRepeatPassword,
  onSubmitResetPasswordForm,
}: {
  data?: {
    resetPassword: {
      success: boolean;
    };
  };
  loading: boolean;
  error?: Error;
  password: string;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  repeatPassword: string;
  onChangeRepeatPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitResetPasswordForm: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <p className="forgotPasswordPage__invite">Create a New Password</p>
      {error && <HelperText className="error">{error.message}</HelperText>}
      <ResetPasswordForm
        disabled={loading}
        password={password}
        onChangePassword={onChangePassword}
        repeatPassword={repeatPassword}
        onChangeRepeatPassword={onChangeRepeatPassword}
        onSubmit={onSubmitResetPasswordForm}
      />
    </>
  );
};

const ForgotPasswordContent = ({
  data,
  error,
  loading,
  onSubmitForgotPasswordForm,
  email,
  onChangeEmail,
}: {
  data?: {
    forgotPassword: {
      success: boolean;
    };
  };
  error?: Error;
  loading: boolean;
  onSubmitForgotPasswordForm: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <p className="forgotPasswordPage__invite">Recover Password</p>
      {data && data.forgotPassword.success ? (
        <p className="success">
          Success! If we find an account matching this email, we&apos;ll send it
          instructions to reset your password.
        </p>
      ) : (
        <ForgotPasswordForm
          onSubmit={onSubmitForgotPasswordForm}
          email={email}
          onChangeEmail={onChangeEmail}
          disabled={loading}
          error={
            error && <HelperText className="error">{error.message}</HelperText>
          }
        />
      )}
    </>
  );
};

const useParamToken = () => {
  const { token } = useParams<{ token: string }>();

  return { token: token ? token.split('&')[0] : '' };
};

const ForgotPassword: FunctionComponent<{ noRedirect: boolean }> = ({
  noRedirect,
}) => {
  const { token } = useParamToken();
  const history = useHistory();

  const auth = useAuth();

  const { email, onChangeEmail } = useForgotPasswordForm();

  const {
    password,
    onChangePassword,
    repeatPassword,
    onChangeRepeatPassword,
  } = useResetPasswordForm();

  if (auth.currentUser && !noRedirect) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmitForgotPasswordForm: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    auth.sendForgotPassword({
      email,
    });
  };

  const onSubmitResetPasswordForm: React.FormEventHandler<
    HTMLFormElement
  > = event => {
    event.preventDefault();
    auth.sendResetPassword({ password, repeatPassword, recoveryToken: token });
  };

  const isResetPassword = !!token;

  const content = isResetPassword ? (
    <ResetPasswordContent
      data={auth.resetPasswordMutation.data}
      loading={auth.resetPasswordMutation.loading}
      error={auth.resetPasswordMutation.error}
      password={password}
      onChangePassword={onChangePassword}
      repeatPassword={repeatPassword}
      onChangeRepeatPassword={onChangeRepeatPassword}
      onSubmitResetPasswordForm={onSubmitResetPasswordForm}
    />
  ) : (
    <ForgotPasswordContent
      data={auth.forgotPasswordMutation.data}
      loading={auth.forgotPasswordMutation.loading}
      error={auth.forgotPasswordMutation.error}
      onSubmitForgotPasswordForm={onSubmitForgotPasswordForm}
      email={email}
      onChangeEmail={onChangeEmail}
    />
  );

  return (
    <StyledForgotPassword>
      <Navbar showLogin />
      <div className="forgotPasswordPage">{content}</div>
    </StyledForgotPassword>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
