const typeDefs = `
  type Channel {
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
    channels: [Channel]
    channel(id: ID!): Channel
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addChannel(name: String!): Channel
  }
`;

export { typeDefs };
