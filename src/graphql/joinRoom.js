import { gql } from 'apollo-boost';

const JOIN_ROOM = gql`
  mutation JoinRoom($roomId: ID!) {
    joinRoom(roomId: $roomId) {
      success
    }
  }
`;

export { JOIN_ROOM };
