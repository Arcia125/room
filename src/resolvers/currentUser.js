import { getUser, setUser } from '../utils/user';

const currentUser = {
  defaults: {
    currentUser: getUser(),
  },
  resolvers: {
    Mutation: {
      saveUser: (_, { username, id, email, token, avatar }, { cache }) => {
        const user = { id, username, email, avatar, __typename: 'User' };

        console.log('saveUser resolver', user, token);

        setUser({ user, cache, token });

        return { user, token, __typename: 'AuthPayload' };
      },
    },
    Query: {
      currentUser: () => {
        console.log('getting current user');

        const user = getUser();
        return user ? user : null;
      },
    },
  },
};

export { currentUser };
