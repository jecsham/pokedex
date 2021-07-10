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

/** standard response */
const _adapterResponse = (success: boolean, result: any): AdapterResponse => {
  return {
    success,
    message: success ? "Success operation" : result,
    result: success ? result : undefined,
  };
};

/** Fetch a single pokemon (from cache first, then api) */
async function fetchPokemon(name: string): Promise<Pokemon | undefined> {
  // check cache first
  let pokemon: Pokemon | undefined = pokemonsCache.get(name);
  if (pokemon) return pokemon;

  // fetch from api
  try {
    let response = await fetch(`${_baseUrl}/api/pokemon/${name}`);

    if (response.status !== 200) throw Error("Server issues");
    let json = await response.json();
    if (!json.success) throw Error(`API Server Error: ${json.message}`);
    pokemon = json.result;
    return pokemon;
  } catch (error) {
    throw Error(`Error trying to fetch: ${error}`);
  }
}

/** Fetch random pokemons from the api */
async function fetchPokemons(): Promise<AdapterResponse> {
  if (pokemonsCache.size > 1) return _adapterResponse(true, pokemonsCache);

  try {
    let response = await fetch(`${_baseUrl}/api/pokemons`);

    if (response.status !== 200) throw Error(response.statusText);
    let json = await response.json();
    if (!json.success) throw Error(`API Server Error: ${json.message}`);
    console.log(json);
    for (const item of json.result) {
      pokemonsCache.set(item.name, item);
    }
    return _adapterResponse(true, pokemonsCache);
  } catch (error) {
    return _adapterResponse(false, error.message);
  }
}

export { fetchPokemons, fetchPokemon, selectedPokemonCache, pokedex };
