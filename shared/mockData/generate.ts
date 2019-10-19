import faker from 'faker';

import { User } from '../../src/types/User';
import { Message } from '../../src/types/Message';
import { Room } from '../../src/types/Room';

/**
 * Randomly chosen seed value, causes the faker functions to produce the same results each time.
 * Change this number to get different results, or comment out this function to get randomized results.
 */
faker.seed(1592);

export type FakeDataGenerator<T> = (defaults: Partial<T>) => T;

export type MultipleFunc<T> = (gen: FakeDataGenerator<T>, count: number) => T[];

const multiple: MultipleFunc<any> = (gen, count) =>
  new Array(count).fill(null).map(() => {
    const generated = gen({});
    return generated;
  });

type CreateMultipleGenerator = <T>(
  gen: FakeDataGenerator<T>
) => (count: number) => T[];
/**
 * @description Convenience wrapper around generating arrays with generators.
 * @example
 * import faker from 'faker';
 *
 * let id = 0 ;
 *
 * const userGenerator = () => ({ id: id++, username: faker.internet.userName() })
 *
 * const multipleUserGenerator = createMultipleGenerator(userGenerator);
 *
 * multipleUserGenerator(2) // [{ id: 1, username: 'example' }, { id: 2, usernamme: 'example2' }]
 */
const createMultipleGenerator: CreateMultipleGenerator = gen => count =>
  multiple(gen, count);

let nextId = 0;

const genId = () => {
  const id = (nextId++).toString();
  return id;
};

const user: FakeDataGenerator<User> = ({
  id,
  username,
  avatar,
  firstName,
  lastName,
  email,
} = {}) => ({
  id: id || genId(),
  username: username || faker.internet.userName(),
  avatar: avatar || faker.internet.avatar(),
  firstName: firstName || faker.name.firstName(),
  lastName: lastName || faker.name.lastName(),
  email: email || faker.internet.exampleEmail(),
  __typename: 'User',
});

const users = createMultipleGenerator(user);

const message: FakeDataGenerator<Message> = ({
  id,
  content,
  user: defaultUser,
} = {}) => ({
  id: id || genId(),
  content: content || faker.lorem.words(),
  user: defaultUser || user({}),
  __typename: 'Message',
});

const messages = createMultipleGenerator(message);

const room: FakeDataGenerator<Room> = ({
  id,
  name,
  messages: defaultMessages,
  users: defaultUsers,
} = {}) => ({
  id: id || genId(),
  name: name || faker.internet.userName(),
  users: defaultUsers || users(4),
  messages: defaultMessages || messages(4),
  __typename: 'Room',
});

const rooms = createMultipleGenerator(room);

export { user, users, message, messages, room, rooms };
