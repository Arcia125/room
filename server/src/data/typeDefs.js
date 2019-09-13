const typeDefs = `
  type Room {
    id: ID!
    name: String
    messages: [Message]!
  }

  type Message {
    id: ID!
    content: String
  }

  type Query {
    rooms: [Room]
    room(id: ID!): Room
  }

  type Mutation {
    addRoom(name: String!): Room
    sendMessage(roomId: ID!, content: String!): Message
  }

  type Subscription {
    newRoomMessage(roomId: ID!): Message
  }
`;

export { typeDefs };
