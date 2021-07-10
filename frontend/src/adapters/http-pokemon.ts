let selectedPokemonCache: Pokemon;
let _pokemonApiQtyToFetch = 12;
let _pokemonApiCount = 151; // original only
let pokemonsCache: Map<string, Pokemon> = new Map<string, Pokemon>();

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
 * Fetch a single pokemon (from cache first, then api)
 *
 */
async function fetchPokemon(name: string): Promise<Pokemon | undefined> {
  // check cache first
  let pokemon: Pokemon | undefined = pokemonsCache.get(name);
  if (pokemon) return pokemon;

  // fetch from api
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (response.status !== 200) throw Error("API server issues");
    let json = await response.json();
    pokemon = {
      id: json?.id,
      name: json?.name,
      picture: json?.sprites?.other["official-artwork"]?.front_default,
      types: json?.types?.map((e: any) => e?.type?.name),
    };
    return pokemon;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetch random pokemons from the api
 *
 */
async function fetchPokemons(): Promise<Map<string, Pokemon> | undefined> {
  if(pokemonsCache.size > 1) return pokemonsCache;
  let numbers = _genUniqueRandomIntegers();
  let promises = numbers.map((e) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${e}`)
  );

  try {
    let responses = await Promise.allSettled(promises);

    for (const resp of responses) {
      if (resp.status === "rejected") throw Error("Error trying to fetch");
      if (resp.value.status !== 200) throw Error("API server issues");
      let json = await resp.value.json();

      pokemonsCache.set(json?.name, {
        id: json?.id,
        name: json?.name,
        picture: json?.sprites?.other["official-artwork"]?.front_default,
        types: json?.types?.map((e: any) => e?.type?.name),
      });
    }

    return pokemonsCache;
  } catch (error) {
    console.log(error);
  }
  return;
}

export { fetchPokemons, fetchPokemon, selectedPokemonCache };
