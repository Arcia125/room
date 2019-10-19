import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import { HomePage } from './styles';
import Navbar from '../../components/Navbar';
import GetStarted from '../../components/GetStarted';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { CREATE_USER } from '../../graphql/createUser';
import { SAVE_USER } from '../../graphql/saveUser';
import { useField } from '../../hooks/useField';

export interface GetStartedProps {
  history: any;
}

const GetStarted = (props: GetStartedProps): JSX.Element => {
  const { value, onChange } = useField();

  const [saveUser, saveUserMutation] = useMutation(SAVE_USER);

  const [createUser, createUserMutation] = useMutation(CREATE_USER, {
    update: (client, mutResult) => {
      const variables = {
        ...mutResult.data.createUser.user,
        token: mutResult.data.createUser.token,
      };

      console.log('saving user ', variables);

      saveUser({
        variables,
      });

      window.location.reload();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({ variables: { username: value } });
    props.history.push('/dashboard');
  };

  return (
    <>
      <GetStartedForm onSubmit={handleSubmit}>
        <div className="form">
          <input
            className="form__input"
            value={value}
            onChange={onChange}
            placeholder="Enter a username"
          />
          <Button className="form__button" color="primary" type="submit">
            <i className="material-icons">arrow_right_alt</i>
          </Button>
        </div>
      </GetStartedForm>
    </>
  );
};

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
