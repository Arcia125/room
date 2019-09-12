import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import {
  render,
  cleanup,
  wait,
  waitForElement,
  act
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Room from '.';
import { GET_ROOM } from '../../graphql/getRoom';
import { Provider } from '../../theme';

const mockRoom = {
  id: 'test-id',
  name: 'test-room',
  messages: [
    {
      id: 0,
      content: 'test-content'
    }
  ]
};

const { id: roomId } = mockRoom;

afterEach(cleanup);

const getRoomMock = {
  request: {
    query: GET_ROOM,
    variables: { roomId }
  },
  result: {
    data: {
      room: mockRoom
    }
  }
};

describe('Room', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider mocks={[getRoomMock]}>
        <Provider>
          <Room match={{ params: { roomId } }} />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
