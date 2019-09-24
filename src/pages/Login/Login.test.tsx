import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Login from '.';
import { Provider } from '../../theme';
import { mockRouteComponentProps } from '../../../shared/mocks/mockRouteComponentProps';
import { nullCurrentUserMockResolvers } from '../../../shared/queryMocks/currentUser';

afterEach(cleanup);

describe('Login', () => {
  it('renders without crashing', async () => {
    const { container, asFragment } = render(
      <MockedProvider addTypename resolvers={nullCurrentUserMockResolvers}>
        <Provider>
          <Login {...mockRouteComponentProps} />
        </Provider>
      </MockedProvider>
    );

    await wait(() => expect(container).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
