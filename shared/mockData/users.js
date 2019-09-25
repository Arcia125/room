import * as generate from './generate';

const users = [
  generate.user({
    username: 'Kevin',
    avatar: 'https://source.unsplash.com/cqraK2a3Or8/50x50',
    email: 'kevin@test.com',
  }),
  generate.user({
    username: 'Kaitlyn',
    avatar: 'https://source.unsplash.com/tzzpfLiRPlA/50x50',
    email: 'kaitlyn@test.com',
  }),
  generate.user({
    username: 'Donte',
    avatar: 'https://source.unsplash.com/7nL3AhoUxw0/50x50',
    email: 'donte@test.com',
  }),
  generate.user({
    username: 'Chelsie',
    avatar: 'https://source.unsplash.com/4TMBk-LqEKo/50x50',
    email: 'chelsie@test.com',
  }),
  ...generate.users(10),
];

export { users };
