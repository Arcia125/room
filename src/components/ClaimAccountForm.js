import React from 'react';
import PropTypes from 'prop-types';

import { useField } from '../hooks/useField';

const ClaimAccountForm = ({}) => {
  const emailField = useField();
  const passwordField = useField();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" {...emailField} />
      <input type="password" {...passwordField} />
    </form>
  );
};

ClaimAccountForm.propTypes = {};

export { ClaimAccountForm };
