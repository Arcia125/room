import React, { ReactElement } from 'react';

import { useField } from '../hooks/useField';

type ClaimAccountFormOnSubmit = ({
  email,
  password,
}: {
  password: string;
  email: string;
}) => any;

type ClaimAccountFormProps = {
  onSubmit: ClaimAccountFormOnSubmit;
  children: ReactElement;
};

const ClaimAccountForm: React.FunctionComponent<ClaimAccountFormProps> = ({
  onSubmit,
  children,
}) => {
  const emailField = useField();
  const passwordField = useField();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const onSubmitValue = {
      email: emailField.value,
      password: passwordField.value,
    };

    onSubmit(onSubmitValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        autoComplete="username email"
        {...emailField}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        autoComplete="current-password"
        {...passwordField}
      />
      {children}
    </form>
  );
};

export { ClaimAccountForm };
