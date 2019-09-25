import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import { HomePage } from './styles';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/styles/Button';
import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { CREATE_USER } from '../../graphql/createUser';
import { SAVE_USER } from '../../graphql/saveUser';
import { useField } from '../../hooks/useField';

const GetStartedForm = styled.form`
  .form {
    display: flex;
    width: 39.6rem;
    height: min-content;
    border: none;
    &__input {
      font-size: 1.6rem;
      padding: 1.5rem;
      width: 34.8rem;
      border: 1px;
      border-radius: 2px 0 0 2px;
    }
    &__button {
      cursor: pointer;
      height: 4.8rem;
      width: 4.8rem;
      border: 1px solid #f2f2f2;
      border-radius: 0 2px 2px 0;
      padding: 0;
      color: #fff;
      /* avoids weird gap when input is focused */
      border: 1px;
      &:hover {
        background-color: ${p => p.theme.colors.purple};
      }
    }
  }
`;

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

  if (getCurrentUserQuery.loading) return <HomePage>Loading...</HomePage>;
  if (getCurrentUserQuery.error)
    return <HomePage>{getCurrentUserQuery.error.message}</HomePage>;
  const currentUser =
    getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser;
  if (currentUser) {
    history.push('/dashboard');
  }

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

Home.propTypes = {};

export default Home;
