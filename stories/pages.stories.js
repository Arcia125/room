import React from 'react';

import { mockedProvider, themeProvider } from './decorators';
import { getRoomMock, newRoomMessageMock, mockRoom } from '../shared/queryMocks/room';
import roomMdText from './Room.md';
import Room from '../src/pages/Room';

const mocks = [getRoomMock, newRoomMessageMock];

export default {
  title: 'pages',
  decorators: [mockedProvider(mocks), themeProvider],
};

export const room = () => <Room match={{ params: { roomId: mockRoom.id }}} />;

room.story = {
  name: 'Room',
  parameters: { notes: { markdown: roomMdText } },
};
