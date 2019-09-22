import { users } from '../mockData/users';
import { GET_CURRENT_USER } from '../../src/graphql/getCurrentUser';


const currentUserMock = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: users[0]
  }
}


export { currentUserMock };