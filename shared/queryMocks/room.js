import * as generate from '../mockData/generate';
import { GET_ROOM } from '../../src/graphql/getRoom';
import { NEW_ROOM_MESSAGE } from '../../src/graphql/newRoomMessage';
import { users } from '../mockData/users';
import { NEW_ROOM_USER } from '../../src/graphql/newRoomUser';
import { JOIN_ROOM } from '../../src/graphql/joinRoom';
import { ADD_ROOM } from '../../src/graphql/addRoom';

const mockRoom = generate.room({
  id: 'test-id',
  name: 'test-room',
  messages: generate.messages(2),
  users,
});

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
      newRoomMessage: generate.message(),
    },
  },
};

const newRoomUserMock = {
  request: {
    query: NEW_ROOM_USER,
    variables: { roomId },
  },
  result: {
    data: {
      newRoomUser: generate.user(),
    },
  },
};

const joinRoomMock = {
  request: {
    query: JOIN_ROOM,
    variables: { roomId },
  },
  result: {
    data: {
      joinRoom: {
        success: true,
        __typename: 'SuccessResult',
      },
    },
  },
};

const addRoomMock = {
  request: {
    query: ADD_ROOM,
  },
  result: {
    data: {
      addRoom: generate.room(),
    },
  },
};

export {
  mockRoom,
  getRoomMock,
  newRoomMessageMock,
  newRoomUserMock,
  joinRoomMock,
  addRoomMock,
};
