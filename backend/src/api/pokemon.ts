import { ApiResponse, apiResponse } from "./utils";
import fetch from "node-fetch";

let selectedPokemonCache: Pokemon;
let _pokemonApiQtyToFetch = 12;
let _pokemonApiCount = 151; // originals only

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  picture: string;
}

function _genUniqueRandomIntegers(): number[] {
  let randoms: number[] = [];
  while (randoms.length < _pokemonApiQtyToFetch) {
    var r = Math.floor(Math.random() * _pokemonApiCount) + 1;
    if (randoms.indexOf(r) === -1) randoms.push(r);
  }
  return randoms;
}

/**
 * Fetch a single pokemon
 *
 */
async function fetchPokemon(name: string): Promise<ApiResponse> {
  if (!name) return apiResponse(false, "name param is not defined");
  let pokemon: Pokemon;
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (response.status !== 200)
      apiResponse(false, "Pokemon API server issues");
    let json = await response.json();
    pokemon = {
      id: json?.id,
      name: json?.name,
      picture: json?.sprites?.other["official-artwork"]?.front_default,
      types: json?.types?.map((e: any) => e?.type?.name),
    };
    return apiResponse(true, pokemon);
  } catch (error) {
    return apiResponse(false, error);
  }
}

/**
 * Fetch random pokemons from the api
 *
 */
async function fetchPokemons(): Promise<ApiResponse> {
  let pokemons: Pokemon[] = [];
  let numbers = _genUniqueRandomIntegers();
  let promises = numbers.map((e) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${e}`)
  );

  try {
    let responses = await Promise.allSettled(promises);

    for (const resp of responses) {
      if (resp.status === "rejected") return apiResponse(false, resp.reason);
      if (resp.value.status !== 200)
        return apiResponse(false, "Pokemon API server issues");
      let json = await resp.value.json();

      pokemons.push(json?.name, {
        id: json?.id,
        name: json?.name,
        picture: json?.sprites?.other["official-artwork"]?.front_default,
        types: json?.types?.map((e: any) => e?.type?.name),
      });
    }
    return apiResponse(true, pokemons);
  } catch (error) {
    return apiResponse(false, error);
  }
}

export { fetchPokemons, fetchPokemon, selectedPokemonCache };
