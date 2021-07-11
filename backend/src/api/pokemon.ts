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

/**
 * Generate an array of unique integer numbers
 * @return number[]
 */
const _genUniqueRandomIntegers = (): number[] => {
  let randoms: number[] = [];
  while (randoms.length < _pokemonApiQtyToFetch) {
    var r = Math.floor(Math.random() * _pokemonApiCount) + 1;
    if (randoms.indexOf(r) === -1) randoms.push(r);
  }
  return randoms;
};

/**
 * Fetch, validate and convert to json
 * @param url - url to fetch
 * @return Promise<any>
 */
const _fetch = async (url: string): Promise<any> => {
  let response = await fetch(url);
  if (response.status !== 200) throw new Error(response.statusText);
  let json = await response.json();
  return json;
};

/**
 * Fetch a single pokemon from pokemon API and format it
 * @param name - pokemon name
 * @return Promise<ApiResponse>
 */
const fetchPokemon = async (name: string): Promise<ApiResponse> => {
  if (!name) return apiResponse(false, "name param is not defined");
  let pokemon: Pokemon;
  try {
    let json = await _fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
};

/**
 * Fetch random pokemons from pokemon api and format it
 * @return Promise<ApiResponse>
 */
const fetchPokemons = async (): Promise<ApiResponse> => {
  let pokemons: Pokemon[] = [];
  let numbers = _genUniqueRandomIntegers();
  let promises = numbers.map((e) =>
    _fetch(`https://pokeapi.co/api/v2/pokemon/${e}`)
  );

  try {
    let responses = await Promise.allSettled(promises);

    for (const resp of responses) {
      if (resp.status === "rejected") return apiResponse(false, resp.reason);
      let json = resp.value;
      pokemons.push({
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
};

export { fetchPokemons, fetchPokemon, selectedPokemonCache };
