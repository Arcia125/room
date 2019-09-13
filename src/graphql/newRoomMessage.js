import { gql } from 'apollo-boost';

const NEW_ROOM_MESSAGE = gql`
  subscription NewRoomMessage($roomId: ID!) {
    newRoomMessage(roomId: $roomId) {
      id
      content
    }
  }
`;

export { NEW_ROOM_MESSAGE };
