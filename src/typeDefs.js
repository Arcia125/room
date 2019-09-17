import { gql } from 'apollo-boost';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    avatar: String
    userName: String
  }

  type Room {
    id: ID!
    name: String
    messages: [Message]!
    users: [User]!
  }

  type Query {
    rooms: [Room]
    room(id: ID!): Room
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    login(userName: String!, password: String!): User
    addRoom(name: String!): Room
    sendMessage(roomId: ID!, content: String!): Message
  }

  type Subscription {
    newRoomMessage(roomId: ID!): Message
  }
`;

export { typeDefs };
