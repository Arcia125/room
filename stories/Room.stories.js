import React from 'react';
import { storiesOf } from '@storybook/react';

import StyledRoom from '../src/components/styles/Room';
import { Button } from '../src/components/styles/Button';
import {
  getRoomMock,
  newRoomMessageMock,
  mockRoom,
  newRoomUserMock,
  joinRoomMock,
} from '../shared/queryMocks/room';
import { currentUserMockResolvers } from '../shared/queryMocks/currentUser';

import { users } from '../shared/mockData/users';
import UserList from '../src/components/UserList';
import { mockedProvider, themeProvider, routerProvider } from './decorators';

const mocks = [getRoomMock, newRoomMessageMock, newRoomUserMock, joinRoomMock];
export default {
  title: 'room',
  decorators: [
    mockedProvider(mocks, currentUserMockResolvers),
    themeProvider,
    routerProvider,
  ],
};

const messages = [
  {
    id: 874184414,
    content: 'How was the rest of your night?',
  },
  {
    id: 4971394719,
    content: 'A lot of time spent copying the design for room',
  },
  {
    id: 23752758235,
    content: 'Nice',
  },
];

storiesOf('Room', module).add('with some people', () => (
  <StyledRoom>
    <UserList users={users} />
    <div className="chatbox">
      <h1 className="chatbox__header">Gold Coast</h1>
      <ul className="chatbox__message-list">
        {messages.map(message => (
          <li key={message.id} className="chatbox__message-list--item">
            {message.content}
          </li>
        ))}
      </ul>
      <div className="chatbox__input">
        <input
          className="chatbox__input--field"
          placeholder="Type a message..."
        />
        <button className="chatbox__input--button">
          <i className="material-icons">send</i>
        </button>
      </div>
    </div>
  </StyledRoom>
));
