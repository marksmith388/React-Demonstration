import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Event =  props => (
  <tr>
    <td>{props.event.username}</td>
    <td>{props.event.title}</td>
    <td>{props.event.description}</td>
    <td>{props.event.date.substring(0,10)}</td>
    <td>{props.event.type}</td>
    <td>{props.event.duration}</td>
    <td>
      <Link to={"/edit/"+props.event._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEvent(props.event._id)}}>delete</a>
    </td>
  </tr>
)

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this);

    this.state = {events: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/events/')
      .then(response => {
        this.setState({ events: response.data})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  deleteEvent(id){
    console.log(id)
    axios.delete('http://localhost:5000/events/'+id)
      .then(res => console.log(res.data));

    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.events.map(currentevent => {
      return <Event event= {currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>;
    })
  }
    render() {
        return(
          <div>
            <h3>Logged Event</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList() }
              </tbody>
            </table>
          </div>
        );
    }
}