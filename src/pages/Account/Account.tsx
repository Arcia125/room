import React from 'react';
import PropTypes from 'prop-types';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { useQuery } from '@apollo/react-hooks';

const Account = () => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  if (getCurrentUserQuery.loading) return 'Loading...';
  if (getCurrentUserQuery.error) return getCurrentUserQuery.error.message;

  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;
  return (
    <div>
      <h1>Account</h1>
      <label htmlFor="email">Email</label>
      <input id="email" readOnly value={currentUser.email} />
      <label htmlFor="password">Username</label>
      <input id="password" readOnly value={currentUser.username} />
    </div>
  );
};

Account.propTypes = {};

export default Account;
