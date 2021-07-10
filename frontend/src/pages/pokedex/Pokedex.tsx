import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemon,
  Pokemon,
} from "../../adapters/http-pokemon";

function PokeDex() {
  let { pokemonName } = useParams<any>();
  let [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const loadPokemon = async () => {
    let pokemon = await fetchPokemon(pokemonName);
    if (pokemon) setSelectedPokemon(pokemon);
  };

  const renderPlaceholder = () => {
    if (!selectedPokemon) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-sm-8 col-lg-6 g-3">
          {/* <ExpandedCard
            name={selectedPokemon?.name}
            picture={selectedPokemon?.picture}
            id={selectedPokemon?.id}
            types={selectedPokemon?.types}
          /> */}
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
          <h3 className="text-center">Digital PokeDex</h3>
        </div>
      </div>
      <div className="row justify-content-center">{renderPlaceholder()}</div>
    </div>
  );
}
export default PokeDex;
