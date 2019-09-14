import React from 'react';
import { storiesOf } from '@storybook/react';

import { mockedProvider, themeProvider } from './decorators';
import RoomStory from './Room.stories';
import { getRoomMock, newRoomMessageMock } from '../shared/queryMocks/room';

const mocks = [getRoomMock, newRoomMessageMock];

storiesOf('pages', module)
  .addDecorator(mockedProvider(mocks))
  .addDecorator(themeProvider)
  .add('Room', () => <RoomStory />);
