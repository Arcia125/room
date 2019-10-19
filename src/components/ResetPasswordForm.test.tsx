import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';

import { ResetPasswordForm } from './ResetPasswordForm';
import { Provider } from '../theme';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('ResetPasswordForm', () => {
  it('renders without crashing', () => {
    const resetPasswordForm = {
      email: '',
      onChangeEmail: jest.fn(),
      onSubmit: jest.fn(),
    };

    const { container } = render(
      <MemoryRouter>
        <Provider>
          <ResetPasswordForm {...resetPasswordForm} />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
