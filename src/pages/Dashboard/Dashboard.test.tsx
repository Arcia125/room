import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from '.';
import { Provider } from '../../theme';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';

afterEach(cleanup);

describe('Dashboard', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <MockedProvider addTypename>
        <Provider>
          <Dashboard {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
