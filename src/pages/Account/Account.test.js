import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Account from '.';
import { Provider } from '../../theme';

const mocks = [];

afterEach(cleanup);

describe('Account', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={mocks}>
        <Provider>
          <Account />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
