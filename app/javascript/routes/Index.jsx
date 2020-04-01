import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Trips from '../components/Trips';
import Trip from '../components/Trip';
import NewTrip from '../components/NewTrip';
import NewCost from '../components/NewCost';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/trips" exact component={Trips} />
      <Route path="/trip/:id" exact component={Trip} />
      <Route path="/trip" exact component={NewTrip} />
    </Switch>
  </Router>
);
