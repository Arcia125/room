import React from 'react';
import PropTypes from 'prop-types';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { useQuery } from '@apollo/react-hooks';
import MainLayout from '../../components/MainLayout';

const Account: React.FunctionComponent = () => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  if (getCurrentUserQuery.loading) return <MainLayout>Loading...</MainLayout>;
  if (getCurrentUserQuery.error)
    return <MainLayout>{getCurrentUserQuery.error.message}</MainLayout>;

  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;
  return (
    <MainLayout>
      <h1>Account</h1>
      <label htmlFor="email">Email</label>
      <input id="email" readOnly value={currentUser.email} />
      <label htmlFor="password">Username</label>
      <input id="password" readOnly value={currentUser.username} />
    </MainLayout>
  );
};

Account.propTypes = {};

export default Account;
