import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '.';
import { Provider } from '../../theme';

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider mocks={[]}>
        <Provider>
          <Home />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
