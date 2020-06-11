import axios from 'axios'

class User {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  userList() {
    return this.api.get('/users').then(res => res.data).then(res => res);
  }

  singleUser(args) {
      console.log(args);
      return this.api.get(`/users/${args.id}`).then(res => res.data).then(res => res);
  }
  personList() {
    return this.api.get('/people').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  leaveList() {
    return this.api.get('/leaves').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  transferOptions() {
    return this.api.get('/transferOptions').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  months() {
    return this.api.get('/months').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  days() {
    return this.api.get('/days').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  dateFormat() {
    return this.api.get('/dateFormat').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  teamOptions() {
    return this.api.get('/teamOptions').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }
  statusOptions() {
    return this.api.get('/statusOptions').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }
  reportOptions() {
    return this.api.get('/reportOptions').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  country() {
    return this.api.get('/allcountry').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  channels() {
    return this.api.get('/channels').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  weekdays() {
    return this.api.get('/weekdays').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getHolliday(args) {
    console.log(args.id)
    return this.api.get(`/holliday/${args.id}`).then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getLeaveCustom() {
    return this.api.get('/leaveTypesCustom').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getLeavePaid() {
    return this.api.get('/leaveTypesPaid').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  async addCustomLeave(args) {
    console.log(args);
    const d = await this.api.post(`/leaveTypesCustom`, args);
    console.log(d.data);
    if (d.status === 200 || d.status === 201){
        return {
            msg: "Leave added successfuly!",
            data: d.data
        }
    }
    return {
        msg: "Something went wrong!"
    }
  }

  async deleteLeave(args) {
      const data = await this.api.delete(`/leaveTypesCustom/${args.id}`);
      console.log(data);
        if (data.status === 200 ){
            return {
                msg: "Item deleted successfuly!",
            }
        }
        return {
            msg: "Something went wrong!"
        }
  }

  async updateCustomLeave(args) {
      console.log(args);
    const data = await this.api.put(`/leaveTypesCustom/${args.id}`, {
        id: args.id,
        name: args.name,
        active: args.active,
        type: args.type,
        DPY: args.DPY,
        AR: args.AR,
        RR: args.RR,
        AHD: args.AHD
    });
    console.log(data);
      if (data.status === 200 ){
          return {
              msg: "Item Updated successfuly!",
          }
      }
      return {
          msg: "Something went wrong!"
      }
    }

    async updatePaidLeave(args) {
        console.log(args);
      const data = await this.api.put(`/leaveTypesPaid/${args.id}`, {
          id: args.id,
          name: args.name,
          active: args.active,
          DPY: args.DPY,
          AR: args.AR,
      });
      console.log(data);
        if (data.status === 200 ){
            return {
                msg: "Item Updated successfuly!",
            }
        }
        return {
            msg: "Something went wrong!"
        }
    }

    async updateGeneralSetttings(args) {
      console.log(args);
      const data = await this.api.put(`/generalsettings/${args.id}`, args);
      console.log(data);
        if (data.status === 200 ){
            return {
                msg: "Settings Updated successfuly!",
            }
        }
        return {
            msg: "Something went wrong!"
        }
    }

    async updateWorkWeeks(args) {
        console.log('workweek2 ', args);
        const data = await this.api.put(`/workweeks/${args.id}`, args);
        console.log(data);
          if (data.status === 200 ){
              return {
                  msg: "Workweeks Updated successfuly!",
              }
          }
          return {
              msg: "Something went wrong!"
          }
    }

    async updateExport(args) {
        console.log('export object ', args);
        const data = await this.api.put(`/export/${args.id}`, args);
        console.log(data);
          if (data.status === 200 ){
              return {
                  msg: "Data exported successfuly!",
              }
          }
          return {
              msg: "Something went wrong!"
          }
    }

    async updateBilling(args) {
        console.log('billing object ', args);
        const data = await this.api.put(`/billing/${args.id}`, args);
        console.log(data);
          if (data.status === 200 ){
              return {
                  msg: "Billing details updated successfuly!",
              }
          }
          return {
              msg: "Something went wrong!"
          }
    }

    async updateNotification(args) {
        console.log('notification object ', args);
        const data = await this.api.put(`/notifications/${args.id}`, {
            id: args.id,
            org_id: args.org_id,
            reportType: args.reportType,
            status: args.status,
            startDate: args.startDate,
            endDate: args.endDate,
            teams: args.teams.split(',')
        });
        console.log(data);
          if (data.status === 200 ){
              return {
                  msg: "Notification details updated successfuly!",
              }
          }
          return {
              msg: "Something went wrong!"
          }
    }

    async create(data) {
        console.log("My users data ", data);
        //data.friends = data.friends 
        //  ? data.friends.map(id => ({ id })) 
        //  : []
    
        const data1 = await this.api.post('/users', data.input);
        console.log(data1);
        if (data1.status === 200 || data.status === 201){
            return {
                msg: "User created successfuly!",
                data: data1.data
            }
        }else {
            return {
                error: "Something went wrong!"
            }
        }
    }
    async createLeave(data) {
        console.log(data);
        const data1 = await this.api.post('/leave', data.input);
        console.log(data1);
        if (data1.status === 201 || data.status === 200){
            return {
                msg: "Leave added successfuly!"
            }
        }
        return {
            error: "Something went wrong!"
        }
    }
    }

export default new User();