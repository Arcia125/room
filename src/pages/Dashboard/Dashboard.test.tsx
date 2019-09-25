import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import {
  render,
  cleanup,
  wait,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from '.';
import { Provider } from '../../theme';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';
import { currentUserMockResolvers } from '../../../shared/queryMocks/currentUser';
import { addRoomMock } from '../../../shared/queryMocks/room';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Dashboard', () => {
  it('renders without crashing', async () => {
    const { container, asFragment } = render(
      <MockedProvider addTypename resolvers={currentUserMockResolvers}>
        <Provider>
          <Dashboard {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  it('allows the user to create a room', async () => {
    const { findByTestId } = render(
      <MockedProvider
        addTypename
        mocks={[addRoomMock]}
        resolvers={currentUserMockResolvers}
      >
        <Provider>
          <Dashboard {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    let createRoomButton: HTMLElement = await waitForElement(() =>
      findByTestId('create-room-button')
    );

    fireEvent.click(createRoomButton);

    // after the createRoom mutation completes the component should redirect to the new room
    await wait(() =>
      expect(mockRouteComponentProps.history.push).toBeCalledTimes(1)
    );
  });
});
