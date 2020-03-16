import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Button } from './styles/Button';
import GetStartedFormStyles from './styles/GetStarted';
import { CREATE_USER } from '../graphql/createUser';
import { SAVE_USER } from '../graphql/saveUser';
import { useField } from '../hooks/useField';

const GetStarted = (): JSX.Element => {
  const history = useHistory();
  const { value, onChange } = useField();
  const [saveUser] = useMutation(SAVE_USER);

  const [createUser] = useMutation(CREATE_USER, {
    update: (_client, mutResult) => {
      const variables = {
        ...mutResult.data.createUser.user,
        token: mutResult.data.createUser.token,
      };
      saveUser({ variables });
      window.location.reload();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({ variables: { username: value } });
    history.push('/dashboard');
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
