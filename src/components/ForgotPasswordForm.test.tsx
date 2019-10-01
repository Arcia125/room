import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import { Provider } from '../theme';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('ForgotPasswordForm', () => {
  it('renders without crashing', () => {
    const forgotPasswordFormProps = {
      email: '',
      onChangeEmail: jest.fn(),
      onSubmit: jest.fn(),
    };

    const { container } = render(
      <MemoryRouter>
        <Provider>
          <ForgotPasswordForm {...forgotPasswordFormProps} />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
