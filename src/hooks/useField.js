import { useState } from 'react';

export const useField = ({ initialValue = '' } = { initialValue: '' }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange
  };
};
