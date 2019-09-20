import { gql } from 'apollo-boost';

const SAVE_USER = gql`
  mutation SaveUser(
    $id: ID
    $username: String
    $email: String
    $token: String
  ) {
    saveUser(id: $id, username: $username, email: $email, token: $token)
      @client {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export { SAVE_USER };
