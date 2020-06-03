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
  async create(data) {
    console.log("My users data ", data);
    //data.friends = data.friends 
    //  ? data.friends.map(id => ({ id })) 
    //  : []
  
    const data1 = await this.api.post('/users', data.input);
    console.log(data1);
    if (data1.status === '200' || data.status === '201'){
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

export default new User();;