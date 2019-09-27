import React from 'react';

import Navbar from '../src/components/Navbar';
import { themeProvider, routerProvider } from './decorators';

export default {
  title: 'Navbar',
  component: Navbar,
  decorators: [themeProvider, routerProvider],
};

export const homepage = () => <Navbar />;
