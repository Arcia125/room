import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '.';
import { Provider } from '../../theme';
import {
  currentUserMockResolvers,
  nullCurrentUserMockResolvers,
} from '../../../shared/queryMocks/currentUser';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing when no user is logged in', async () => {
    const { container, asFragment } = render(
      <MockedProvider addTypename resolvers={nullCurrentUserMockResolvers}>
        <Provider>
          <Home {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing when a user is logged in', async () => {
    const { container } = render(
      <MockedProvider addTypename resolvers={currentUserMockResolvers}>
        <Provider>
          <Home {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() => expect(container).toBeInTheDocument());
  });

  it('redirects logged in users', async () => {
    const { container } = render(
      <MockedProvider addTypename resolvers={currentUserMockResolvers}>
        <Provider>
          <Home {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() =>
      expect(mockRouteComponentProps.history.push).toBeCalledTimes(1)
    );
  });
});
