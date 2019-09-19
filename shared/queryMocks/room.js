import { GET_ROOM } from '../../src/graphql/getRoom';
import { NEW_ROOM_MESSAGE } from '../../src/graphql/newRoomMessage';

const mockRoom = {
  id: 'test-id',
  name: 'test-room',
  messages: [
    {
      id: 0,
      content: 'test-content',
      __typename: 'Message',
    },
  ],
  users: [],
  __typename: 'Room',
};

const { id: roomId } = mockRoom;

const getRoomMock = {
  request: {
    query: GET_ROOM,
    variables: { id: roomId },
  },
  result: {
    data: {
      room: mockRoom,
    },
  },
};

const newRoomMessageMock = {
  request: {
    query: NEW_ROOM_MESSAGE,
    variables: { roomId },
  },
  result: {
    data: {
      newRoomMessage: {
        id: 1,
        content: 'test-content',
        __typename: 'Message',
      },
    },
  },
};

export { mockRoom, getRoomMock, newRoomMessageMock };
