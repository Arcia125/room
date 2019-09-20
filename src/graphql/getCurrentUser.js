import { gql } from 'apollo-boost';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client {
      id
      username
      email
    }
  }
`;

export { GET_CURRENT_USER };
