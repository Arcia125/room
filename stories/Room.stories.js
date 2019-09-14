import React from 'react';

import Room from '../src/pages/Room';
import { mockRoom } from '../shared/queryMocks/room';

const RoomStory = () => <Room match={{ params: { roomId: mockRoom.id }}} />;

export default RoomStory;
