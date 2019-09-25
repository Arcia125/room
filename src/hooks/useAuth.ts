import { useMutation, useQuery } from '@apollo/react-hooks';

import { LOGIN } from '../graphql/login';
import { SAVE_USER } from '../graphql/saveUser';
import { GET_CURRENT_USER } from '../graphql/getCurrentUser';

export const useAuth = () => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  const [saveUser, saveUserMutation] = useMutation(SAVE_USER);

  const [executeLogin, loginMutation] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      const variables = {
        ...data.login.user,
        token: data.login.token,
      };

      saveUser({
        variables,
      });

      window.location.reload();
    },
  });

  const loginUser = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    executeLogin({ variables: { username, password } });
  };

  return {
    loginUser,
    currentUser:
      getCurrentUserQuery.data && getCurrentUserQuery.data.currentUser,
  };
};
