import React from 'react';

import { mockedProvider, themeProvider, routerProvider } from './decorators';
import {
  getRoomMock,
  newRoomMessageMock,
  mockRoom,
  newRoomUserMock,
  joinRoomMock,
} from '../shared/queryMocks/room';
import roomMdText from './Room.md';
import Room from '../src/pages/Room';
import homeMdText from './Home.md';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login/Login';
import { currentUserMockResolvers } from '../shared/queryMocks/currentUser';
import Dashboard from '../src/pages/Dashboard';
import Account from '../src/pages/Account';
import ForgotPassword from '../src/pages/ForgotPassword';

const mocks = [getRoomMock, newRoomMessageMock, newRoomUserMock, joinRoomMock];

const mockHistory = {
  push: () => {},
};

export default {
  title: 'pages',
  decorators: [
    mockedProvider(mocks, currentUserMockResolvers),
    themeProvider,
    routerProvider,
  ],
};

export const home = () => <Home history={mockHistory} />;

home.story = {
  name: 'Home',
  parameters: { notes: { markdown: homeMdText } },
};

// export const room = () => <Room match={{ params: { roomId: mockRoom.id } }} />;

// room.story = {
//   name: 'Room',
//   parameters: { notes: { markdown: roomMdText } },
// };

export const login = () => <Login history={mockHistory} />;

login.story = {
  name: 'Login',
};

export const dashboard = () => <Dashboard />;

dashboard.story = {
  name: 'Dashboard',
};

export const account = () => <Account />;

account.story = {
  name: 'Account',
};

export const forgotPassword = () => <ForgotPassword noRedirect />;

forgotPassword.story = {
  name: 'ForgotPassword',
};
