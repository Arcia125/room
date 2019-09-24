import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '.';
import { Provider } from '../../theme';

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing', async () => {
    const { container, getByText, debug } = render(
      <MockedProvider mocks={[]}>
        <Provider>
          <Home />
        </Provider>
      </MockedProvider>
    );
    debug();
    await wait(() => expect(container).toBeInTheDocument());
    await wait(() => getByText(/Loading.../i));
  });
});
