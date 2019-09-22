import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Login from '.';
import { Provider } from '../../theme';

const mocks = [];

afterEach(cleanup);

describe('Login', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename mocks={mocks}>
        <Provider>
          <Login />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
