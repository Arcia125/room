import { getUser, setUser, getToken } from '../utils/user';
// let user = {
//   id: null,
//   username: null,
//   __typename: 'User'
// };

// let user = getUser();

const currentUser = {
  defaults: {
    currentUser: getUser()
  },
  resolvers: {
    Mutation: {
      saveUser: (_, { username, id, email, token }, { cache }) => {
        const user = { id, username, email, __typename: 'User' };
        console.log('saveUser resolver', user, token);
        // console.log('saving user ', user);
        // cache.writeQuery({
        //   query: GET_CURRENT_USER,
        //   data: { currentUser: user },
        // });

        setUser({ user, cache, token });

        return { user, token, __typename: 'AuthPayload' };
        // cache.writeData({
        //   currentUser: {
        //     id,
        //     username,
        //     __typename: 'User',
        //   },
        // });
      }
    },
    Query: {
      currentUser: (root, args, { cache }, info) => {
        // debugger;
        console.log('getting current user');
        // const queryResult = cache.readQuery({
        //   query: GET_CURRENT_USER,
        // });
        // console.log('readQuery', queryResult);
        const user = getUser();
        return user ? user : null;
        // return {
        //   user: getUser(),
        //   token: getToken(),
        // };
      }
    }
  }
};

export { currentUser };
