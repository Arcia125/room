import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from './Modal';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('Modal', () => {
  it('renders without crashing', () => {
    const { container } = render(<Modal isOpen />);

    expect(container).toBeInTheDocument();
  });
});
