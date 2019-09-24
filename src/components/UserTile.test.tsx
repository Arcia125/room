import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserTile from './UserTile';
import { Provider } from '../theme';
import { users } from '../../shared/mockData/users';

afterEach(cleanup);

describe('UserTile', () => {
  it('renders without crashing', () => {
    const mockUser = users[0];
    const { container } = render(
      <Provider>
        <UserTile avatar={mockUser.avatar} name={mockUser.username} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
