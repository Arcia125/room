import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '.';
import { Provider } from '../../theme';
import {
  nullCurrentUserMock,
  currentUserMock
} from '../../../shared/queryMocks/currentUser';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';

// mocks queries for when logged out
const unauthorizedMocks = [nullCurrentUserMock];

// mocks queries for when logged in
const authorizedMocks = [currentUserMock];

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing when no user is logged in', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={unauthorizedMocks}>
        <Provider>
          <Home {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() => expect(container).toBeInTheDocument());
  });

  it('renders without crashing when a user is logged in', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={authorizedMocks}>
        <Provider>
          <Home {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() => expect(container).toBeInTheDocument());
  });
});
