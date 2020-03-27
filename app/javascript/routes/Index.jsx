import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Places from '../components/Places';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/places" exact component={Places} />
    </Switch>
  </Router>
);
