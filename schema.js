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

input GeneralSettings {
    id: ID!
    org_id: ID!
    dateFormat: String
    sendNotification: Boolean
    allowSlack: Boolean
    transfer: String
    daysExpire: Boolean
    month: String
    date: String
}
input SingleObject {
    name: String
}

input WorkWeeks {
    id: ID!
    org_id: ID!
    sunday: Boolean,
    monday: Boolean
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean
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

input Export {
    id: ID!
    org_id: ID!
    reportType: String
    status: String
    startDate: String
    endDate: String
    teams: [String]

}

input Weekly {
    week: Boolean
    day: String
    time: String
}

input Daily {
    day: Boolean
    time: String
}

input Notifications {
    id: ID!
    org_id: ID!
    channel: String
    timeZone: String
    weekly: Weekly
    daily: Daily
}

input BillingInfo {
    id: ID!
    org_id: ID!
    company: String 
    email: String
    city: String
    country: String
    address: String
    address2: String
    vat: String
    coupon: String
    cardNumber: String
    expiryDate: String
}
type Data {
    msg: String
    data: LeaveType
}
type Query {
    users: [User]
    user(id: ID!): User
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
    updategeneralSettings(input: GeneralSettings): Msg
    updateworkWeek(input: WorkWeeks): Msg
    updateexport(input: Export): Msg
    updatebilling(input: BillingInfo): Msg
    updatenotifications(input: Notifications): Msg
}
`

export const resolvers = {
  Query: {
    users() {
        return userModel.userList()
    },
    user(_, id) {
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
    updategeneralSettings(_, args) {
        return userModel.updateGeneralSetttings(args.input);
    },
    updateworkWeek(_, args) {
        console.log('workweek ', args.input);
        return userModel.updateWorkWeeks(args.input);
    },
    updateexport(_, args) {
        console.log('export ', `${args.input.teams}`);
        return userModel.updateExport(args.input);
    },
    updatebilling(_, args) {
        console.log('workweek ', args.input);
        return userModel.updateBilling(args.input);
    },
    updatenotifications(_, args) {
        console.log('notifications', args.input);
        return userModel.updateNotification(args.input);
    }
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