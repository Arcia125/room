import { rooms } from '../../../shared/mockData/rooms';

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

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

    // TODO: update all clients in room
    return newMessage;
  },
};

const resolvers = {
  Query,
  Mutation,
};

export { resolvers };
