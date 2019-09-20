import { gql } from 'apollo-boost';

const SAVE_USER = gql`
  mutation SaveUser($id: ID, $username: String, $token: String) {
    saveUser(id: $id, username: $username, token: $token) @client {
      token
      user {
        id
        username
      }
    }
  }
`;

export { SAVE_USER };
