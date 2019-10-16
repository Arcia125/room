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
import { MemoryRouter } from 'react-router';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Dashboard', () => {
  it('renders without crashing', async () => {
    const { container, asFragment } = render(
      <MemoryRouter>
        <MockedProvider addTypename resolvers={currentUserMockResolvers}>
          <Provider>
            <Dashboard {...mockRouteComponentProps} />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );
    await wait(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
