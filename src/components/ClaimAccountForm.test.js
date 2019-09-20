import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ClaimAccountForm } from './ClaimAccountForm';
import { Provider } from '../theme';

afterEach(cleanup);

describe('ClaimAccountForm', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider mocks={[]}>
        <Provider>
          <ClaimAccountForm />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
