import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { Provider } from '../src/theme';

// eslint-disable-next-line react/display-name
const mockedProvider = mocks => storyFn => (
  <MockedProvider mocks={mocks} addTypename>
    {storyFn()}
  </MockedProvider>
);

const themeProvider = storyFn => <Provider>{storyFn()}</Provider>;

export { mockedProvider, themeProvider };
