import React from 'react';
import { storiesOf } from '@storybook/react';

import { users } from '../shared/mockData/users';
import UserList from '../src/components/UserList';

storiesOf('UserList', module).add('with some people', () => (
  <UserList users={users} />
));
