let _baseUrl = "";
let selectedPokemonCache: Pokemon;
let pokemonsCache: Map<string, Pokemon> = new Map<string, Pokemon>();
let pokedex: Map<string, Pokemon> = new Map<string, Pokemon>();

if (process.env.NODE_ENV === "development") {
  _baseUrl = "http://localhost:3001";
}

interface AdapterResponse {
  success: boolean;
  message: string;
  result: any;
}

export interface PartialPokemon {
  name: string;
  picture: string;

  /** add pokemon to pokedex cache */
  addFn?: (name: string) => void;

  /** remove pokemon from pokedex cache */
  removeFn?: (name: string) => void;
}
export interface Pokemon extends PartialPokemon {
  id: number;
  types: string[];
}

/**
 * Fetch, validate and convert to json
 * @param url - url to fetch
 * @return Promise<any>
 */
const _fetch = async (url: string): Promise<any> => {
  let response = await fetch(url);
  if (response.status !== 200) throw Error(response.statusText);
  let json = await response.json();
  if (!json.success) throw Error(`API Server Error: ${json.message}`);
  return json;
};

/**
 * Standard response for apis
 */
const _adapterResponse = (success: boolean, result: any): AdapterResponse => {
  return {
    success,
    message: success ? "Success operation" : result,
    result: success ? result : undefined,
  };
};

/**
 * Fetch a single pokemon (from cache first, then server api)
 * @param name - pokemon name
 * @return Promise<ApiResponse>
 */
async function fetchPokemon(name: string): Promise<AdapterResponse> {
  // check cache first
  let pokemon = pokemonsCache.get(name);
  if (pokemon) return _adapterResponse(true, pokemon);

  // fetch from server api
  try {
    let json = await _fetch(`${_baseUrl}/api/pokemon/${name}`);
    pokemon = json.result;
    return _adapterResponse(true, pokemon);
  } catch (error) {
    return _adapterResponse(false, error.message);
  }
}

/**
 * Fetch random pokemons server api
 * @return Promise<ApiResponse>
 */
async function fetchPokemons(): Promise<AdapterResponse> {
  if (pokemonsCache.size > 1) return _adapterResponse(true, pokemonsCache);

  try {
    let json = await _fetch(`${_baseUrl}/api/pokemons`);
    for (const item of json.result) {
      pokemonsCache.set(item.name, item);
    }
    return _adapterResponse(true, pokemonsCache);
  } catch (error) {
    return _adapterResponse(false, error.message);
  }
}

export { fetchPokemons, fetchPokemon, selectedPokemonCache, pokedex };
