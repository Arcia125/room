import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  spacing: {
    0: '0px',
    1: '8px',
    2: '16px',
    3: '32px'
  }
};

const Provider = ({ children, ...restPRops }) => (
  <ThemeProvider theme={theme} {...restPRops}>
    {children}
  </ThemeProvider>
);

export { theme, Provider };
