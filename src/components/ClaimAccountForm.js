import React from 'react';
import PropTypes from 'prop-types';

import { useField } from '../hooks/useField';

const ClaimAccountForm = ({ onSubmit, children }) => {
  const emailField = useField();
  const passwordField = useField();

  const handleSubmit = event => {
    event.preventDefault();

    const onSubmitValue = {
      email: emailField.value,
      password: passwordField.value
    };

    onSubmit(onSubmitValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        data-testid="email"
        id="email"
        type="email"
        name="email"
        {...emailField}
      />
      <label htmlFor="password">Password</label>
      <input
        data-testid="password"
        id="password"
        type="password"
        name="password"
        {...passwordField}
      />
      {children}
    </form>
  );
};

ClaimAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export { ClaimAccountForm };
