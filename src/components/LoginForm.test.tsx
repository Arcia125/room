import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { LoginForm, LoginFormProps } from './LoginForm';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(cleanup);

describe('LoginForm', () => {
  it('renders without crashing', () => {
    const loginFormProps: LoginFormProps = {
      username: '',
      password: '',
      onChangePassword: jest.fn(),
      onChangeUsername: jest.fn(),
      onSubmit: jest.fn(),
    };

    const { container } = render(<LoginForm {...loginFormProps} />);

    expect(container).toBeInTheDocument();
  });
});
