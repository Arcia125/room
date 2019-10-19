import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  spacing: {
    0: '0px',
    1: '8px',
    2: '16px',
    3: '32px',
  },
  colors: {
    blueAccent: '#2D9CDB',
    blueLink: '#2A8CF1',
    gray: '#B3B2C0',
    grayDark: '#1f1f1f',
    grayBlue: '#AEB3C8',
    lightBlue: '#AEAFE8',
    blue: '#AC2FC9',
    lighterPurple: '#EFEEF8',
    lightPurple: '#D8D8F3',
    purple: '#9056D4',
    pink: '#DD6589',
    bleh: '#8A4966',
  },
};

const Provider: React.FunctionComponent<{ children: ReactElement }> = ({
  children,
  ...restProps
}) => (
  <ThemeProvider theme={theme} {...restProps}>
    {children}
  </ThemeProvider>
);

export { theme, Provider };
