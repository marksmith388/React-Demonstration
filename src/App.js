import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import EventList from "./components/event-list.component";
import EditEvent from "./components/edit-event.component";
import CreateEvent from "./components/create-event.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
       <div className="container">
         <Navbar />
         <br/>
         <Route path="/" exact component={EventList} />
         <Route path="/edit/:id" component={EditEvent} />
         <Route path="/create-event" component={CreateEvent} />
         <Route path="/create-user" component={CreateUser} />
       </div>
    </Router>
  );
}

export default App;
