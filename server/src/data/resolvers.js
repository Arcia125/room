const rooms = [
  {
    id: 1,
    name: 'games',
    messages: []
  },
  {
    id: 2,
    name: 'tv',
    message: []
  },
];

let nextId = rooms.length + 1;

const Query = {
  rooms: () => {
    return rooms;
  },
  room: (root, { id }) => {
    return rooms.find(room => room.id == id);
  },
};

const Mutation = {
  addRoom: (root, args) => {
    const newRoom = { id: nextId++, name: args.name, messages: [] };
    rooms.push(newRoom);
    return newRoom;
  },
};


const resolvers = {
  Query,
  Mutation,
};

export { resolvers };
