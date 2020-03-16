import {
  getLocalStorageValue,
  setLocalStorage,
  removeFromLocalStorage,
} from './storage';
import { GET_CURRENT_USER } from '../graphql/getCurrentUser';
import { ApolloCache } from 'apollo-cache';
import { User } from '../types/User';

const TOKEN_STORAGE_KEY = 'roomCurrentUserToken';

const USER_STORAGE_KEY = 'roomCurrentUser';

const getUser = () => getLocalStorageValue(USER_STORAGE_KEY);

const getToken = () => getLocalStorageValue(TOKEN_STORAGE_KEY, null);

const setUser = ({
  user,
  cache,
  token,
}: {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: ApolloCache<any>;
  token: string;
}) => {
  if (cache) {
    cache.writeQuery({
      query: GET_CURRENT_USER,
      data: { currentUser: user },
    });
  }

  setLocalStorage(TOKEN_STORAGE_KEY, token);

  setLocalStorage(USER_STORAGE_KEY, user);
};

/**
 * @TODO finish
 */
// eslint-disable-next-line
const logout = ({ cache }: { cache?: ApolloCache<any> }) => {
  // if (cache) {
  // }
  removeFromLocalStorage(TOKEN_STORAGE_KEY);

  removeFromLocalStorage(USER_STORAGE_KEY);

  window.location.replace('/');
};

export { getUser, setUser, getToken, logout };
