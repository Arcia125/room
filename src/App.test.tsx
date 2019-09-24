import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

afterEach(cleanup);

describe('App', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename>
        <App />
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
