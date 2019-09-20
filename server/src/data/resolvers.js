import { rooms } from '../../../shared/mockData/rooms';
import { pubsub } from '../controllers/pubsub';
import { RoomNotFoundError } from './errors';
import { User } from '../models/user';
import { createRandomUsername } from '../utils/createRandomUsername';
import { signToken } from '../utils/auth';

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

const NEW_ROOM_MESSAGE = 'newRoomMessage';

const findRoomById = roomId => {
  const room = rooms.find(room => room.id == roomId);
  if (!room) throw new RoomNotFoundError('Room could');
  return room;
};

const getNewRoomMessageChannel = roomId => `${NEW_ROOM_MESSAGE}__${roomId}`;

const publishNewRoomMessage = (roomId, newRoomMessage) =>
  pubsub.publish(getNewRoomMessageChannel(roomId), { newRoomMessage });

const subscribeToNewRoomMessages = roomId =>
  pubsub.asyncIterator(getNewRoomMessageChannel(roomId));

const Query = {
  rooms: () => {
    return rooms;
  },
  room: (root, { id }) => {
    return findRoomById(id);
  },
};

const Mutation = {
  // signup: (root, { username, password }) => {
  //   // const user = new User();
  // },
  createUser: async (root, { username }) => {
    console.log(`creating user ${username}`);

    const user = new User({
      username: username || createRandomUsername(),
      password: null,
    });

    const savedUser = await user.save();

    // Sign jwt with user email and username as payload
    const token = signToken({
      email: savedUser.email,
      username: savedUser.username,
    });

    return {
      token,
      user: savedUser,
    };
  },
  claimAccount: async (root, { email, password }, context) => {
    if (!context.currentUser) throw new Error('Must be signed in.');
    if (context.currentUser.email)
      throw new Error('Can only be used by unclaimed accounts');

    console.log(context.currentUser);

    const user = context.currentUser;

    user.email = email;

    user.password = password;

    const updatedUser = await user.save();

    const token = signToken({
      email: updatedUser.email,
      username: updatedUser.username,
    });

    return {
      user: updatedUser,
      token,
    };
  },
  login: async (root, { username, password }) => {
    console.warn('IMPLEMENT AUTH');

    // const user = users.find(user => user.username === username);
    const user = await User.findByLogin(username);

    if (!user) throw new Error('User not found');

    const matches = await user.comparePassword(password);

    if (matches) {
      // const token = 'implement this!';
      const token = signToken({
        email: user.email,
        username: user.username,
      });

      return {
        user,
        token,
      };
    }

    throw new Error('Password did not match');
  },
  addRoom: (root, { name }, context) => {
    console.log('adding room. context ', context);
    const newRoom = {
      id: nextRoomId++,
      name,
      messages: [],
      users: context.currentUser ? [context.currentUser] : [],
    };

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
