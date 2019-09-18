import { GET_CURRENT_USER } from '../graphql/getCurrentUser';

let user = {
  id: null,
  username: null,
  __typename: 'User'
};

const currentUser = {
  defaults: {
    currentUser: user
  },
  resolvers: {
    Mutation: {
      saveUser: (_, { id, username }, { cache }) => {
        user = { id, username };
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: user
        });
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
        return user;
      }
    }
  }
};

export { currentUser };
