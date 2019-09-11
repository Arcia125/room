const typeDefs = `
  type Room {
    id: ID!
    name: String
    messages: [Message]!
  }

  type Message {
    id: ID!
    text: String
  }

  # This type specifies the entry points into our API. 
  type Query {
    rooms: [Room]
    room(id: ID!): Room
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    # A mutation to add a new room to the list of rooms
    addRoom(name: String!): Room
  }
`;

export { typeDefs };
