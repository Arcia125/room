import { PubSub } from 'graphql-subscriptions';

import { rooms } from '../../../shared/mockData/rooms';

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

const pubsub = new PubSub();

const NEW_ROOM_MESSAGE = 'newRoomMessage';

const getNewRoomMessageChannel = roomId => `${NEW_ROOM_MESSAGE}__${roomId}`;

const Query = {
  rooms: () => {
    return rooms;
  },
  room: (root, { id }) => {
    return rooms.find(room => room.id == id);
  },
};

const Mutation = {
  addRoom: (root, { name }) => {
    const newRoom = { id: nextRoomId++, name, messages: [] };
    rooms.push(newRoom);
    return newRoom;
  },
  sendMessage: (root, { roomId, content }) => {
    const room = rooms.find(room => room.id == roomId);
    if (!room) throw new Error('Room not Found');

    const newMessage = { id: nextMessageId++, content };
    room.messages.push(newMessage);

    const data = {
      newRoomMessage: newMessage,
    };

    pubsub.publish(getNewRoomMessageChannel(roomId), data);

    return newMessage;
  },
};

const Subscription = {
  newRoomMessage: {
    subscribe: (root, { roomId }) => {
      return pubsub.asyncIterator(getNewRoomMessageChannel(roomId));
    },
  },
};

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export { resolvers };
