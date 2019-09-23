import { gql } from 'apollo-boost';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client {
      id
      username
      email
      avatar
    }
  }
`;

export { GET_CURRENT_USER };
