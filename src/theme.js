import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  spacing: {
    0: '0px',
    1: '8px',
    2: '16px',
    3: '32px'
  },
  colors: {
    gray: '#B3B2C0',
    grayDark: '#1f1f1f',
    lightBlue: '#AEAFE8',
    blue: '#AC2FC9',
    lightPurple: '#EFEEF8',
    purple: '#9056D4',
    pink: '#DD6589',
    bleh: '#8A4966'
  }
};

const Provider = ({ children, ...restPRops }) => (
  <ThemeProvider theme={theme} {...restPRops}>
    {children}
  </ThemeProvider>
);

export { theme, Provider };
