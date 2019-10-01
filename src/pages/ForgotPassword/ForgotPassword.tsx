import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { ForgotPasswordForm } from '../../components/ForgotPasswordForm';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';

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
  }
`;

const ForgotPassword: FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const auth = useAuth();

  // const {
  //   username,
  //   password,
  //   onChangeEmail,
  //   onChangePassword,
  // } = useLoginForm();

  const { email, onChangeEmail } = useForgotPasswordForm();

  if (auth.currentUser) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    auth.sendForgotPassword({ email });
  };

  return (
    <StyledForgotPassword>
      <Navbar />
      <div className="forgotPasswordPage">
        <p className="forgotPasswordPage__invite">Recover Password</p>
        <ForgotPasswordForm
          onSubmit={onSubmit}
          email={email}
          onChangeEmail={onChangeEmail}
        />
      </div>
    </StyledForgotPassword>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
