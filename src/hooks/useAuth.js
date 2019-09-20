import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '../graphql/login';
import { SAVE_USER } from '../graphql/saveUser';

export const useAuth = () => {
  const [saveUser, saveUserMutation] = useMutation(SAVE_USER);

  const [executeLogin, loginMutation] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      const variables = {
        ...data.login.user,
        token: data.login.token
      };

      saveUser({
        variables
      });

      window.location.reload();
    }
  });
  const loginUser = ({ username, password }) => {
    executeLogin({ variables: { username, password } });
  };
  return {
    loginUser
  };
};
