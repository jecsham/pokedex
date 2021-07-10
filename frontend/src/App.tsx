import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/details";
import Header from "./pages/header";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details/:pokemonName">
          <Details  />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
