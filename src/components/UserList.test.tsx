import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserList from './UserList';
import { Provider } from '../theme';
import { users } from '../../shared/mockData/users';

afterEach(cleanup);

describe('UserList', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider>
        <UserList users={users} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
