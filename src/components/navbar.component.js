import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return (
            <nav className="navbar navbar-default navbar-dark bg-dark navbar-expand">
                <Link to="/" className="navbar-brand">TeamTracker</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar narvbar-nav">
                  <li className="navbar-item">
                  <Link to="/" className="nav-link">Events</Link>
                  </li>
                  <li className="navbar-item">
                  <Link to="/create-event" className="nav-link">Create Event Log</Link>
                  </li>
                  <li>
                  <Link to="/create-user" className="nav-link">Create User</Link>
                  </li>
                </ul>
                </div>
            </nav>
        );
    }
}