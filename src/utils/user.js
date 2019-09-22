import {
  getLocalStorageValue,
  setLocalStorage,
  removeFromLocalStorage
} from './storage';
import { GET_CURRENT_USER } from '../graphql/getCurrentUser';

const TOKEN_STORAGE_KEY = 'roomCurrentUserToken';

const USER_STORAGE_KEY = 'roomCurrentUser';

const getUser = () => getLocalStorageValue(USER_STORAGE_KEY);

const getToken = () => getLocalStorageValue(TOKEN_STORAGE_KEY, null);

const setUser = ({ user, cache, token }) => {
  if (cache) {
    cache.writeQuery({
      query: GET_CURRENT_USER,
      data: { currentUser: user }
    });
  }

  setLocalStorage(TOKEN_STORAGE_KEY, token);

  setLocalStorage(USER_STORAGE_KEY, user);
};

/**
 * @TODO finish
 */
const logout = ({ cache }) => {
  // if (cache) {
  // }
  removeFromLocalStorage(TOKEN_STORAGE_KEY);

  removeFromLocalStorage(USER_STORAGE_KEY);

  window.location.reload();
};

export { getUser, setUser, getToken, logout };
