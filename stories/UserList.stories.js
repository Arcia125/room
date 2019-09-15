import React from 'react';
import UserList from '../src/components/UserList';
import { storiesOf } from '@storybook/react';

storiesOf('UserList', module).add('with some people', () => <UserList />);
