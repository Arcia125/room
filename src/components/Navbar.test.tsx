import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Navbar from './Navbar';
import { Provider } from '../theme';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Navbar', () => {
  it('renders without crashing when no user is logged in', () => {
    const { container } = render(
      <Provider>
        <Navbar />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  it('renders an awesome logo', () => {
    const { getByAltText } = render(
      <Provider>
        <Navbar />
      </Provider>
    );

    expect(getByAltText('Room Logo')).toBeInTheDocument();
  });
});
