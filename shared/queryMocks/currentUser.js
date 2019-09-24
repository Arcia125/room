import { users } from '../mockData/users';
import { GET_CURRENT_USER } from '../../src/graphql/getCurrentUser';
import { currentUser } from '../../src/resolvers/currentUser';


const mockUser = users[0];

const currentUserMock = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: {
      currentUser: mockUser
    }
  }
};

const currentUserMockResolvers = {
  Mutation: currentUser.resolvers.Mutation,
  Query: {
    currentUser: () => mockUser
  }
};

const nullCurrentUserMock = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: {
      currentUser: null
    }
  }
};

const nullCurrentUserMockResolvers = {
  Mutation: currentUser.resolvers.Mutation,
  Query: {
    currentUser: () => null
  }
};



export { currentUserMock, currentUserMockResolvers, nullCurrentUserMock, nullCurrentUserMockResolvers };