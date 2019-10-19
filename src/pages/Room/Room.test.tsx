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
  joinRoomMock,
} from '../../../shared/queryMocks/room';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';
import { currentUserMockResolvers } from '../../../shared/queryMocks/currentUser';
import { MemoryRouter } from 'react-router';

const mocks = [getRoomMock, newRoomMessageMock, newRoomUserMock, joinRoomMock];

afterEach(cleanup);

describe('Room', () => {
  it('renders without crashing', () => {
    const { container, asFragment } = render(
      <MemoryRouter>
        <MockedProvider
          addTypename
          mocks={mocks}
          resolvers={currentUserMockResolvers}
        >
          <Provider>
            <Room
              {...mockRouteComponentProps}
              match={{
                ...mockRouteComponentProps.match,
                params: { roomId: mockRoom.id },
              }}
            />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('finishes loading initial queries', async () => {
    const { getByText, asFragment } = render(
      <MemoryRouter>
        <MockedProvider
          addTypename
          mocks={mocks}
          resolvers={currentUserMockResolvers}
        >
          <Provider>
            <Room
              {...mockRouteComponentProps}
              match={{
                ...mockRouteComponentProps.match,
                params: { roomId: mockRoom.id },
              }}
            />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );

    // wait for the room name to be in the document
    await wait(() => expect(getByText(mockRoom.name)).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
