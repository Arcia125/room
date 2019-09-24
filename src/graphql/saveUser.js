import { gql } from 'apollo-boost';

const SAVE_USER = gql`
  mutation SaveUser(
    $id: ID
    $username: String
    $email: String
    $avatar: String
    $token: String
  ) {
    saveUser(
      id: $id
      username: $username
      email: $email
      avatar: $avatar
      token: $token
    ) @client {
      token
      user {
        id
        username
        email
        avatar
      }
    }
  }
`;

export { SAVE_USER };
