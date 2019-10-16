import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Account from '.';
import { Provider } from '../../theme';
import { currentUserMockResolvers } from '../../../shared/queryMocks/currentUser';
import { MemoryRouter } from 'react-router';

afterEach(cleanup);

describe('Account', () => {
  it('renders without crashing', async () => {
    const { container, asFragment } = render(
      <MemoryRouter>
        <MockedProvider addTypename resolvers={currentUserMockResolvers}>
          <Provider>
            <Account />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("finishes loading and displays the current user's username", async () => {
    const { getByDisplayValue, asFragment } = render(
      <MemoryRouter>
        <MockedProvider addTypename resolvers={currentUserMockResolvers}>
          <Provider>
            <Account />
          </Provider>
        </MockedProvider>
      </MemoryRouter>
    );

    await wait(() =>
      expect(
        getByDisplayValue(currentUserMockResolvers.Query.currentUser().username)
      ).toBeInTheDocument()
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
