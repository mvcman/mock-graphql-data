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

type Label {
    value: String
    label: String
}

type DateLabel {
    value: Int
    label: String
}

type GeneralSettings {
    transferOptions: [Label]
    months: [Label]
    days: [DateLabel]
    dateFormat: [Label]
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

type Msg {
    msg: String
}

type TeamName {
    name: String
}
type Holliday {
    name: String
    date: String
}

type Holy {
    id: ID!
    data: [Holliday]
}
input AddLeaveType {
    name: String
    type: String
    active: Boolean
    DPY: Int
    AR: String
    RR: String
    AHD: String
}

input CustomLeaveType {
    id: ID!
    name: String
    type: String
    active: Boolean
    DPY: Int
    AR: String
    RR: String
    AHD: String
}

input PaidLeaveType {
    id: ID!
    name: String
    active: Boolean
    DPY: Int
    AR: String
}

type LeaveType {
    id: ID!
    name: String
    type: String
    active: Boolean
    DPY: Int
    AR: String
    RR: String
    AHD: String
}

type Data {
    msg: String
    data: LeaveType
}
type Query {
    users(username: String): [User]
    persons: [Person]
    leaves: [Leave]
    transferOptions: [Label]
    months: [Label]
    days: [DateLabel]
    dateFormat: [Label]
    teamOptions: [String]
    statusOptions: [Label]
    reportOptions: [Label]
    allcountry: [Label]
    channels: [Label]
    weekdays: [Label]
    user(id: ID!): User
    holliday(id: ID!): Holy
    getLeave: [LeaveType],
    getPaidLeave: [LeaveType]
    deleteLeave(id: ID!): Msg
}

type Mutation {
    createUser(input: CreateUserInput!): User
    createLeave(input: CreateLeave): Msg
    updateCustomLeave(input: CustomLeaveType): Msg
    updatePaidLeave(input: PaidLeaveType): Msg
    addCustomLeaves(input: AddLeaveType): Data
}
`

export const resolvers = {
  Query: {
    users(user) {
        console.log(user);
        return userModel.userList()
    },
    user(source, id) {
        console.log(id);
        return userModel.singleUser(id)
    },
    persons: () => {
        return userModel.personList()
    },
    leaves: () => {
        return userModel.leaveList()
    },

    transferOptions: () => {
        return userModel.transferOptions()
    },

    months: () => {
        return userModel.months()
    },

    days: () => {
        return userModel.days()
    },

    dateFormat: () => {
        return userModel.dateFormat()
    },
    
    teamOptions: () => {
        return userModel.teamOptions()
    },
    reportOptions: () => {
        return userModel.reportOptions()
    },
    statusOptions: () => {
        return userModel.statusOptions()
    },
    allcountry: () => {
        return userModel.country()
    },
    channels: () => {
        return userModel.channels()
    },
    weekdays: () => {
        return userModel.weekdays()
    },
    holliday(source, args) {
        console.log(args);
        return userModel.getHolliday(args)
    },
    getLeave: () => {
        return userModel.getLeaveCustom()
    },
    getPaidLeave: () => {
        return userModel.getLeavePaid()
    },
    deleteLeave(source, args) {
        return userModel.deleteLeave(args);
    }
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
    addCustomLeaves(source, args) {
        console.log(args.name, args.reason);
        return userModel.addCustomLeave(args.input)
    },
    updateCustomLeave(source, args) {
        console.log(args.name, args.reason);
        return userModel.updateCustomLeave(args.input)
    },
    updatePaidLeave(source, args) {
        console.log(args.name, args.reason);
        return userModel.updatePaidLeave(args.input)
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