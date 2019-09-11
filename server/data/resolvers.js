const channels = [
  {
    id: 1,
    name: 'games',
  },
  {
    id: 2,
    name: 'tv',
  },
];

let nextId = channels.length + 1;

const Query = {
  channels: () => {
    return channels;
  },
  channel: (root, { id }) => {
    return channels.find(channel => channel.id == id);
  },
};

const Mutation = {
  addChannel: (root, args) => {
    const newChannel = { id: nextId++, name: args.name, messages: [] };
    channels.push(newChannel);
    return newChannel;
  },
};


const resolvers = {
  Query,
  Mutation,
};

export { resolvers };
