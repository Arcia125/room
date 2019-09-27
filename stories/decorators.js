import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { Provider } from '../src/theme';
import { MemoryRouter } from 'react-router';

// eslint-disable-next-line react/display-name
const mockedProvider = (mocks, resolvers) => storyFn => (
  <MockedProvider mocks={mocks} addTypename resolvers={resolvers}>
    {storyFn()}
  </MockedProvider>
);

const themeProvider = storyFn => <Provider>{storyFn()}</Provider>;

const routerProvider = storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>;

export { mockedProvider, themeProvider, routerProvider };
