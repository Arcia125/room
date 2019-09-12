import { gql } from 'apollo-boost';

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      messages {
        id
        content
      }
    }
  }
`;

export { GET_ROOM };