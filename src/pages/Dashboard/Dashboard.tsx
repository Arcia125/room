import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import MainLayout from '../../components/MainLayout';

const Dashboard: React.FunctionComponent<RouteComponentProps> = () => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  if (getCurrentUserQuery.loading) return <div>Loading...</div>;
  if (getCurrentUserQuery.error)
    return <div>{getCurrentUserQuery.error.message}</div>;

  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;

  return (
    <MainLayout>
      <h1>
        {currentUser && getCurrentUserQuery.data.currentUser.username}
        &apos;s dashboard
      </h1>
      <p>Create a room to get started</p>
    </MainLayout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
