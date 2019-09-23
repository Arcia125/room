import { gql } from 'apollo-boost';

const NEW_ROOM_USER = gql`
  subscription NewRoomUser($roomId: ID!) {
    newRoomUser(roomId: $roomId) {
      id
      username
      avatar
    }
  }
`;

export { NEW_ROOM_USER };
