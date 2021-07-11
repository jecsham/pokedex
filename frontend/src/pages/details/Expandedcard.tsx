import { useContext, useEffect, useState } from "react";
import { pokedex, Pokemon } from "../../adapters/http-pokemon";
import AppContext from "../../contexts/AppContext";

interface ComponentState {
  isPokemonInPokeDex: boolean;
}

function ExpandedCard(props: Pokemon) {
  const [state, setState] = useState<ComponentState>({
    isPokemonInPokeDex: true,
  });

  const appContext = useContext(AppContext);

  const checkPokemonInPokedex = () => {
    setState({ ...state, isPokemonInPokeDex: pokedex.has(props.name) });
  };

  const addPokemonToPokeDex = () => {
    pokedex.set(props.name, props);
    checkPokemonInPokedex();
    appContext.updateCount();
  };
  const removePokemonFromPokeDex = () => {
    pokedex.delete(props.name);
    checkPokemonInPokedex();
    appContext.updateCount();
  };

  const renderButton = () => {
    if (state.isPokemonInPokeDex) {
      return (
        <button
          className="btn btn-sm btn-danger"
          onClick={removePokemonFromPokeDex}
        >
          Remove from PokeDex
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-sm btn-success"
          onClick={addPokemonToPokeDex}
        >
          Add to PokeDex
        </button>
      );
    }
  };

  useEffect(() => {
    checkPokemonInPokedex();
  }, []);

  return (
    <div className="card shadow-sm">
      <img
        src={props.picture}
        draggable={false}
        className="card-img-top bg-secondary bg-gradient"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{props.name}</h5>
        <div className="mb-2">
          <h6># {props.id}</h6>
          <strong className="me-1">Types:</strong>
          {props.types.map((e) => (
            <div key={e} className="me-1 d-inline-block">
              <span className="badge bg-primary">{e}</span>
            </div>
          ))}
        </div>
        {renderButton()}
      </div>
    </div>
  );
}

export default ExpandedCard;
