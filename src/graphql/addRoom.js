import { gql } from 'apollo-boost';

const ADD_ROOM = gql`
  mutation AddRoom($name: String!) {
    addRoom(name: $name) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export { ADD_ROOM };