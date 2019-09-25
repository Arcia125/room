import React from 'react';
import { render, wait, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ClaimAccountForm } from './ClaimAccountForm';
import { Provider } from '../theme';

afterEach(cleanup);

describe('ClaimAccountForm', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <Provider>
        <ClaimAccountForm onSubmit={() => {}} />
      </Provider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });

  it('handles input and submission', () => {
    const submitText = 'test-submit';
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <Provider>
        <ClaimAccountForm onSubmit={onSubmit}>
          <button type="submit">{submitText}</button>
        </ClaimAccountForm>
      </Provider>
    );

    const testEmail = 'test@test.com';
    const testPassword = 'test-password';

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(submitText);

    fireEvent.change(emailInput, {
      target: { value: testEmail },
    });
    fireEvent.change(passwordInput, {
      target: { value: testPassword },
    });

    fireEvent.click(submitButton);

    expect(onSubmit).toBeCalledWith({
      email: testEmail,
      password: testPassword,
    });
  });
});
