import { PubSub } from 'graphql-subscriptions';

import { rooms } from '../../../shared/mockData/rooms';

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

const pubsub = new PubSub();

const NEW_ROOM_MESSAGE = 'newRoomMessage';

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
      newRoomMessage: newMessage
    };

    pubsub.publish(NEW_ROOM_MESSAGE, data);

    // TODO: update all clients in room
    return newMessage;
  },
};

const Subscription = {
  newRoomMessage: {
    subscribe: (root, { roomId }) => {
      return pubsub.asyncIterator(NEW_ROOM_MESSAGE);
    }
  }
}

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export { resolvers };
