import { getUser, setUser } from '../utils/user';

const currentUser = {
  defaults: {
    currentUser: getUser()
  },
  resolvers: {
    Mutation: {
      saveUser: (_, { username, id, email, token }, { cache }) => {
        const user = { id, username, email, __typename: 'User' };

        console.log('saveUser resolver', user, token);

        setUser({ user, cache, token });

        return { user, token, __typename: 'AuthPayload' };
      }
    },
    Query: {
      currentUser: (root, args, { cache }, info) => {
        console.log('getting current user');

        const user = getUser();
        return user ? user : null;
      }
    }
  }
};

export { currentUser };
