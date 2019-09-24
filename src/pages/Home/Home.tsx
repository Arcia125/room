import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import { HomePage } from './styles';
import Navbar from '../../components/Navbar';
import GetStarted from '../../components/GetStarted';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';

const Home: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
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
      <Navbar />
      <div className="homePage">
        <p className="homePage__invite">Pick a username to get started</p>
        <GetStarted history={history} />
      </div>
    </HomePage>
  );
};

export default Home;
