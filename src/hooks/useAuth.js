import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '../graphql/login';

export const useAuth = () => {
  const [executeLogin, loginMutation] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      /**
       * @TODO save user and token on successful login
       */
      // cache.writeData()
    }
  });
  const loginUser = ({ username, password }) => {
    executeLogin({ variables: { username, password } });
  };
  return {
    loginUser
  };
};
