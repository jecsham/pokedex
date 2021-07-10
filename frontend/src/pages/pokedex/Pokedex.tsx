import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pokedex, Pokemon } from "../../adapters/http-pokemon";
import AppContext from "../../contexts/AppContext";
import Row from "./Row";

interface ComponentState {
  items: Pokemon[];
}

function PokeDex() {
  const [state, setState] = useState<ComponentState>({
    items: [],
  });

  const appContext = useContext(AppContext);

  const loadPokedex = async () => {
    setState({
      ...state,
      items: Array.from(pokedex, ([n, v]) => ({
        name: n,
        id: v?.id,
        picture: v?.picture,
        types: v?.types,
      })),
    });
  };

  const removeFromPokedex = (name: string) => {
    pokedex.delete(name);
    loadPokedex();
    appContext.updateCount();
  };

  const renderPlaceholder = () => {
    if (state.items.length === 0) {
      return (
        <p className="text-center">
          You have not added any Pokemon yet.{" "}
          <Link to="/">Add a Pokemon now</Link>
        </p>
      );
    } else {
      return state.items.map((item) => (
        <div key={item.id} className="col-8 g-3">
          <Row
            name={item.name}
            picture={item.picture}
            removeFn={removeFromPokedex}
          />
        </div>
      ));
    }
  };

  useEffect(() => {
    loadPokedex();
  }, []);

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">My PokeDex</h3>
        </div>
      </div>
      <div className="row justify-content-center">{renderPlaceholder()}</div>
    </div>
  );
}
export default PokeDex;
