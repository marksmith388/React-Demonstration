import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateEvent extends Component {
  constructor(props){
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      date: new Date(),
      type: '',
      duration: 0,
      username: '',
      users: []
    }

  }

  componentDidMount(){
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0){
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    const event = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      type: this.state.type,
      duration: this.state.duration,
      username: this.state.username
    }

    console.log(event)

    axios.post('http://localhost:5000/events/add', event, axiosConfig)
      .then(res => console.log(res.data));

  }

    render() {
        return(
        <div>
          <h3>Create New Event Log</h3>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user){
                    return < option
                      key={user}
                      value={user}>{user}
                      </option>
                  })
                }
            </select>
          </div>
            <div className="form-group">
              <label>Title: </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="LLL"
                  />
              </div>
            </div>
            <div className="form-group">
              <label>Type: </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.type}
                  onChange={this.onChangeType}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Event" className="btn btn-primary" />
            </div>
          </form>
        </div>
        );
    }
}