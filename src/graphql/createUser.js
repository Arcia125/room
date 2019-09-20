import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation CreateUser($username: String) {
    createUser(username: $username) {
      token
      user {
        id
        username
        email
        __typename
      }
    }
  }
`;

export { CREATE_USER };
