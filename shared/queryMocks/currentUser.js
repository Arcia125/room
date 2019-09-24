import { users } from '../mockData/users';
import { GET_CURRENT_USER } from '../../src/graphql/getCurrentUser';


const currentUserMock = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: {
      currentUser: users[0]
    }
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

export { currentUserMock, nullCurrentUserMock };