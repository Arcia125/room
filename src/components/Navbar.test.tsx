import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Navbar from './Navbar';
import { Provider } from '../theme';
import { MemoryRouter } from 'react-router';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Navbar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });

  it('renders an awesome logo', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Provider>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );

    expect(getByAltText('Room Logo')).toBeInTheDocument();
  });
});
