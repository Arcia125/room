import { currentUser } from './currentUser';

const resolvers = {
  defaults: {
    ...currentUser.defaults
  },
  resolvers: {
    Mutation: {
      ...currentUser.resolvers.Mutation
    },
    Query: {
      ...currentUser.resolvers.Query
    }
  }
};

export { resolvers };
