import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';

import logo from '../../logo.svg';
import { ADD_ROOM } from '../../graphql/addRoom';
import { HomePage } from './styles';
import { Button } from '../../components/styles/Button';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { CREATE_USER } from '../../graphql/createUser';
import { SAVE_USER } from '../../graphql/saveUser';
import { useField } from '../../hooks/useField';

const GetStarted = ({ history }) => {
  const { value, onChange } = useField();

  const [saveUser, saveUserMutation] = useMutation(SAVE_USER);

  const [createUser, createUserMutation] = useMutation(CREATE_USER, {
    update: (client, mutResult) => {
      const variables = {
        ...mutResult.data.createUser.user,
        token: mutResult.data.createUser.token
      };

      console.log('saving user ', variables);

      saveUser({
        variables
      });

      window.location.reload();
    }
  });

  const handleSubmit = event => {
    event.preventDefault();

    createUser({ variables: { username: value } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={onChange}
          placeholder="Enter a username"
        />
        <Button color="primary" type="submit">
          →
        </Button>
      </form>
    </div>
  );
};

const Home = ({ history }) => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  if (getCurrentUserQuery.loading) return 'Loading...';
  if (getCurrentUserQuery.error) return getCurrentUserQuery.error.message;
  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;
  if (currentUser) {
    history.push('/dashboard');
  }

  return (
    <HomePage>
      <header className="home-page-header">
        <img src={logo} className="home-page-logo" alt="logo" />
        <p>Pick a username to get started</p>
        <GetStarted history={history} />
      </header>
    </HomePage>
  );
};

Home.propTypes = {};

export default Home;
