import { gql } from 'apollo-boost';

const CLAIM_ACCOUNT = gql`
  mutation ClaimAccount($email: String!, $password: String!) {
    claimAccount(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export { CLAIM_ACCOUNT };
