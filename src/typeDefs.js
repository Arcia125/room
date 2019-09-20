import { gql } from 'apollo-boost';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String
  }

  type User {
    id: ID!
    email: String
    firstName: String
    lastName: String
    avatar: String
    username: String
  }

  type AuthPayload {
    token: String
    user: User
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
    createUser(username: String): AuthPayload
    claimAccount(email: String, password: String): AuthPayload
    login(username: String!, password: String!): AuthPayload
    addRoom(name: String!): Room
    sendMessage(roomId: ID!, content: String!): Message
  }

  type Subscription {
    newRoomMessage(roomId: ID!): Message
  }
`;

export { typeDefs };
