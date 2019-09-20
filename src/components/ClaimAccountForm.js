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

ClaimAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export { ClaimAccountForm };
