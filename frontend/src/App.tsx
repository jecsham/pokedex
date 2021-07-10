import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/details";
import Header from "./pages/header";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/home";
import PokeDex from "./pages/pokedex";
import { useState } from "react";
import { pokedex } from "./adapters/http-pokemon";

interface ComponentState {
  count: number;
}

function App() {
  const [state, setState] = useState<ComponentState>({ count: 0 });

  const updateCount = () => {
    console.log("updated context")
    setState({ ...state, count: pokedex.size });
  };

  return (
    <AppProvider value={{ updateCount }}>
      <Router>
        <Header itemCount={state.count} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:pokemonName">
            <Details />
          </Route>
          <Route path="/pokedex">
            <PokeDex />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
