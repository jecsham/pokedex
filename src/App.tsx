import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./header";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/"></Route>
       
      </Switch>
    </Router>
  );
}

export default App;
