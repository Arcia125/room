import { gql } from 'apollo-boost';

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $repeatPassword: String!
    $recoveryToken: String!
  ) {
    resetPassword(
      password: $password
      repeatPassword: $repeatPassword
      recoveryToken: $recoveryToken
    ) {
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

export { RESET_PASSWORD };
