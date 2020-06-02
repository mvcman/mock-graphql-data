import { gql } from 'apollo-server-express'
import userModel from './models'

export const typeDefs = gql`
type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
}
type Person {
    name: String
    firstname: String
    address: String,
    companyName: String
    image: String
}
type Leave {
    name: String
    image: String
    badgeName: String
    count: Int
    from: String
    to: String
    reason: String
    badgename1: String
    approvername: String
    apshort: String
    org: String 
}
input CreateUserInput {
    id: Int
    name: String
    age: Int
    email: String
    friends: [Int]
}
input CreateLeave {
    name: String
    reason: String
    date: String
}

type CreatedMsg {
    msg: String
}

type Query {
    users(username: String): [User],
    persons: [Person],
    leaves: [Leave]
}

type Mutation {
    createUser(input: CreateUserInput!): User
    createLeave(input: CreateLeave): CreatedMsg
}
`

export const resolvers = {
  Query: {
    users(user) {
        console.log(user);
        return userModel.userList()
    },
    persons: () => {
        return userModel.personList()
    },
    leaves: () => {
        return userModel.leaveList()
    },
  },

  Mutation: {
    createUser(source, args) {
      console.log("first", args);
      return userModel.create(args)
    },
    createLeave(source, args) {
      console.log(args);
      return userModel.createLeave(args)
    },
  }
//  Mutation: {
//    createLeave(source, args) {
//        console.log(args.name, args.reason);
//        return {
//            msg: "Added success!"
//        }
//        //return userModel.createLeave(leave)
//    },
//  }
}