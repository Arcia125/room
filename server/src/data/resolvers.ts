import { rooms } from '../../../shared/mockData/rooms';
import { pubsub } from '../controllers/pubsub';
import { RoomNotFoundError } from './errors';
import { createRandomUsername } from '../utils/createRandomUsername';
import { signToken } from '../utils/auth';
import { User, UserDocumentExtended } from '../models/User';
import { createRandomRoomName } from '../utils/createRandomRoomName';
import { IResolvers } from 'graphql-tools';
import { Resolvers } from 'apollo-boost';
import { Message } from '../../../src/types/Message';
import { User as UserType } from '../../../src/types/User';

console.log('resolvers User', User);

interface RoomGQLContext {
  currentUser: UserDocumentExtended;
}

let nextRoomId = rooms.length + 1;

let nextMessageId = 2;

const NEW_ROOM_MESSAGE = 'newRoomMessage';

const NEW_ROOM_USER = 'newRoomUser';

const findRoomById = (roomId: string) => {
  const room = rooms.find(room => room.id == roomId);
  if (!room) throw new RoomNotFoundError('Room could not be found');
  return room;
};

const getNewRoomMessageChannel = (roomId: string) =>
  `${NEW_ROOM_MESSAGE}__${roomId}`;

const getNewRoomUserChannel = (roomId: string) => `${NEW_ROOM_USER}__${roomId}`;

const publishNewRoomMessage = (roomId: string, newRoomMessage: Message) =>
  pubsub.publish(getNewRoomMessageChannel(roomId), { newRoomMessage });

const subscribeToNewRoomMessages = (roomId: string) =>
  pubsub.asyncIterator(getNewRoomMessageChannel(roomId));

const publishNewRoomUserChannel = (roomId: string, newRoomUser: UserType) => {
  const channel = getNewRoomUserChannel(roomId);
  return pubsub.publish(channel, { newRoomUser });
};

const subscribeToNewRoomUsers = (roomId: string) =>
  pubsub.asyncIterator(getNewRoomUserChannel(roomId));

const Query = {
  rooms: () => {
    return rooms;
  },
  room: (root: any, { id }: { id: string }) => {
    return findRoomById(id);
  },
};

const Mutation = {
  // signup: (root, { username, password }) => {
  //   // const user = new User();
  // },
  createUser: async (root: any, { username }: { username: string }) => {
    console.log(`creating user ${username}`);

    const user = new User({
      username: username || createRandomUsername(),
      password: null,
    });

    const savedUser = (await user.save()) as UserDocumentExtended;

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
  claimAccount: async (
    root: any,
    { email, password }: { email: string; password: string },
    context: RoomGQLContext
  ) => {
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
  login: async (
    root: any,
    { username, password }: { username: string; password: string }
  ) => {
    // const user = users.find(user => user.username === username);
    const user = await (User as any).findByLogin(username);

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
  addRoom: (root: any, { name }: { name: string }, context: RoomGQLContext) => {
    console.log('adding room. context ', context);
    const newRoom = {
      id: (nextRoomId++).toString(),
      name: name || createRandomRoomName(),
      messages: [],
      // users: context.currentUser ? [context.currentUser] : [],
      users: [],
    };

    rooms.push(newRoom);

    return newRoom;
  },
  sendMessage: (
    root: any,
    { roomId, content }: { roomId: string; content: string },
    context: RoomGQLContext
  ) => {
    const room = findRoomById(roomId);

    const user = context.currentUser as UserType;

    const newMessage: Message = {
      id: (nextMessageId++).toString(),
      content,
      user,
    };
    room.messages.push(newMessage);

    publishNewRoomMessage(roomId, newMessage);

    return newMessage;
  },
  joinRoom: (
    root: any,
    { roomId }: { roomId: string },
    context: RoomGQLContext
  ) => {
    if (!context.currentUser)
      throw new Error('Must be logged in to join a room');

    const room = findRoomById(roomId);

    if (!room.users.find(user => user.id === context.currentUser.id)) {
      room.users.push(context.currentUser as UserType);
      publishNewRoomUserChannel(roomId, context.currentUser as UserType);
    }

    return {
      success: true,
    };
  },
};

const Subscription: Resolvers = {
  newRoomMessage: {
    subscribe: (root, { roomId }) => {
      return subscribeToNewRoomMessages(roomId);
    },
  },
  newRoomUser: {
    subscribe: (root, { roomId }) => {
      return subscribeToNewRoomUsers(roomId);
    },
  },
};

const resolvers: IResolvers = {
  PublicUser: {
    __resolveType: 'User',
  },
  Query,
  Mutation,
  Subscription,
};

export { resolvers };
