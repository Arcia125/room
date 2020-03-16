import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';

import { HomePage } from './styles';
import Navbar from '../../components/Navbar';
import GetStarted from '../../components/GetStarted';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { HelperText } from '../../components/styles/HelperText';
import { Link } from '../../components/styles/Link';

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const history = useHistory();
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);
  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;
  useEffect(() => {
    if (currentUser) history.push('/dashboard');
  }, [currentUser, history]);

  if (getCurrentUserQuery.loading) return <HomePage>Loading...</HomePage>;
  if (getCurrentUserQuery.error) {
    return <HomePage>getCurrentUserQuery.error.message</HomePage>;
  }

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
