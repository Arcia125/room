import { gql } from 'apollo-boost';

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export { GET_ROOM };