import { gql } from 'apollo-boost';

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

export { FORGOT_PASSWORD };
