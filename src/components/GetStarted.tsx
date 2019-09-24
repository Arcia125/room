import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Button } from './styles/Button';
import GetStartedFormStyles from './styles/GetStarted';
import { CREATE_USER } from '../graphql/createUser';
import { SAVE_USER } from '../graphql/saveUser';
import { useField } from '../hooks/useField';

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
        token: mutResult.data.createUser.token
      };
      console.log('saving user ', variables);
      saveUser({ variables });
      window.location.reload();
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({ variables: { username: value } });
    props.history.push('/dashboard');
  };

  return (
    <GetStartedFormStyles onSubmit={handleSubmit}>
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
    </GetStartedFormStyles>
  );
};

export default GetStarted;
