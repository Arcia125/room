import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Room from '.';
import { Provider } from '../../theme';
import {
  getRoomMock,
  newRoomMessageMock,
  mockRoom,
  newRoomUserMock,
  joinRoomMock
} from '../../../shared/queryMocks/room';
import { currentUserMock } from '../../../shared/queryMocks/currentUser';

const mocks = [
  currentUserMock,
  getRoomMock,
  newRoomMessageMock,
  newRoomUserMock,
  joinRoomMock
];

afterEach(cleanup);

describe('Room', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={mocks}>
        <Provider>
          <Room match={{ params: { roomId: mockRoom.id } }} />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
