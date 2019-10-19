import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';

import { LoginForm } from './LoginForm';
import { Provider } from '../theme';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('LoginForm', () => {
  it('renders without crashing', () => {
    const loginFormProps = {
      username: '',
      password: '',
      onChangePassword: jest.fn(),
      onChangeUsername: jest.fn(),
      onSubmit: jest.fn(),
    };

    const { container } = render(
      <MemoryRouter>
        <Provider>
          <LoginForm {...loginFormProps} />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
