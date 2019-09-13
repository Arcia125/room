import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Room from '.';
import { GET_ROOM } from '../../graphql/getRoom';
import { Provider } from '../../theme';
import { NEW_ROOM_MESSAGE } from '../../graphql/newRoomMessage';

const mockRoom = {
  id: 'test-id',
  name: 'test-room',
  messages: [
    {
      id: 0,
      content: 'test-content',
      __typename: 'Message'
    }
  ],
  __typename: 'Room'
};

const { id: roomId } = mockRoom;

afterEach(cleanup);

const getRoomMock = {
  request: {
    query: GET_ROOM,
    variables: { id: roomId }
  },
  result: {
    data: {
      room: mockRoom
    }
  }
};

const newRoomMessageMock = {
  request: {
    query: NEW_ROOM_MESSAGE,
    variables: { roomId }
  },
  result: {
    data: {
      newRoomMessage: {
        id: 1,
        content: 'test-content',
        __typename: 'Message'
      }
    }
  }
};

const mocks = [getRoomMock, newRoomMessageMock];

describe('Room', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={mocks}>
        <Provider>
          <Room match={{ params: { roomId } }} />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
