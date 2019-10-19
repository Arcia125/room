import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { LoginForm } from '../../components/LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const StyledLogin = styled.div`
  background-color: ${p => p.theme.colors.lighterPurple};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .loginPage {
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

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const auth = useAuth();

  const {
    username,
    password,
    onChangeUsername,
    onChangePassword,
  } = useLoginForm();

  if (auth.currentUser) {
    // if there is a current user, redirect to dashboard
    history.push('/dashboard');
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    auth.loginUser({ username, password });
  };

  return (
    <StyledLogin>
      <Navbar />
      <div className="loginPage">
        <p className="loginPage__invite">Come back in!</p>
        <LoginForm
          onSubmit={onSubmit}
          username={username}
          onChangeUsername={onChangeUsername}
          password={password}
          onChangePassword={onChangePassword}
        />
      </div>
    </StyledLogin>
  );
};

Login.propTypes = {};

export default Login;
