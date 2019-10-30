import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';

import { HomePage } from './styles';
import { Button } from '../../components/styles/Button';
import Navbar from '../../components/Navbar';
import GetStarted from '../../components/GetStarted';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { CREATE_USER } from '../../graphql/createUser';
import { SAVE_USER } from '../../graphql/saveUser';
import { useField } from '../../hooks/useField';
import { HelperText } from '../../components/styles/HelperText';
import { Link } from '../../components/styles/Link';

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const history = useHistory();
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);
  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;

  if (getCurrentUserQuery.loading) return <HomePage>Loading...</HomePage>;
  if (getCurrentUserQuery.error) {
    return <HomePage>getCurrentUserQuery.error.message</HomePage>;
  }
  if (currentUser) history.push('/dashboard');

  return (
    <HomePage>
      <Navbar showLogin />
      <div className="homePage">
        <p className="homePage__invite">Pick a username to get started</p>
        <GetStarted />
        <HelperText>
          <span>Have an account?</span>
          <Link to="/login">Login</Link>
        </HelperText>
      </div>
    </HomePage>
  );
};

export default Home;
