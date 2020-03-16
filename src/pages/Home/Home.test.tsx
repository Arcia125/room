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
import { MemoryRouter } from 'react-router';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing when no user is logged in', async () => {
    const { container, asFragment } = render(
      <MemoryRouter>
        <MockedProvider addTypename resolvers={nullCurrentUserMockResolvers}>
          <Provider>
            <Home />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );

    await wait(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing when a user is logged in', async () => {
    const { container } = render(
      <MemoryRouter>
        <MockedProvider addTypename resolvers={currentUserMockResolvers}>
          <Provider>
            <Home />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );

    await wait(() => expect(container).toBeInTheDocument());
  });
});
