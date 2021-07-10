import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemon, Pokemon } from "../../adapters/http-pokemon";
import ErrorAlert from "../../components/Erroralert";
import ExpandedCard from "./Expandedcard";

interface ComponentState {
  selectedPokemon: Pokemon | null;
  error: string | null;
}

function Details() {
  let { pokemonName } = useParams<any>();
  let [state, setState] = useState<ComponentState>({
    selectedPokemon: null,
    error: null,
  });

  const loadPokemon = async () => {
    let pokemon = await fetchPokemon(pokemonName);
    if (!pokemon.success) return setState({ ...state, error: pokemon.message });
    setState({ ...state, selectedPokemon: pokemon.result });
  };

  const renderPlaceholder = () => {
    if (state.error) return <ErrorAlert message={state.error} />;
    if (!state.selectedPokemon) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-sm-8 col-lg-6 g-3">
          <ExpandedCard
            name={state.selectedPokemon?.name}
            picture={state.selectedPokemon?.picture}
            id={state.selectedPokemon?.id}
            types={state.selectedPokemon?.types}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Pokemon Details</h3>
        </div>
      </div>
      <div className="row justify-content-center">{renderPlaceholder()}</div>
    </div>
  );
}
export default Details;
