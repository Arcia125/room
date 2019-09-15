
import { rooms } from '../../../shared/mockData/rooms';
import { pubsub } from '../controllers/pubsub';

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

const NEW_ROOM_MESSAGE = 'newRoomMessage';

const findRoomById = roomId => {
  const room = rooms.find(room => room.id == roomId);
  if (!room) throw new RoomNotFoundError('Room could');
  return room;
};

const getNewRoomMessageChannel = roomId => `${NEW_ROOM_MESSAGE}__${roomId}`;

const publishNewRoomMessage = (roomId, newRoomMessage) => pubsub.publish(getNewRoomMessageChannel(roomId), { newRoomMessage });

const subscribeToNewRoomMessages = roomId => pubsub.asyncIterator(getNewRoomMessageChannel(roomId));


const Query = {
  rooms: () => {
    return rooms;
  },
  room: (root, { id }) => {
    return findRoomById(id);
  },
};

const Mutation = {
  addRoom: (root, { name }) => {
    const newRoom = { id: nextRoomId++, name, messages: [] };

    rooms.push(newRoom);

    return newRoom;
  },
  sendMessage: (root, { roomId, content }) => {
    const room = findRoomById(roomId);

    const newMessage = { id: nextMessageId++, content };
    room.messages.push(newMessage);

    publishNewRoomMessage(roomId, newMessage);

    return newMessage;
  },
};

const Subscription = {
  newRoomMessage: {
    subscribe: (root, { roomId }) => {
      return subscribeToNewRoomMessages(roomId);
    },
  },
};

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export { resolvers };
