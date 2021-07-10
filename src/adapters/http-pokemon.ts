let _pokemonApiQtyToFetch = 10;
let _pokemonApiCount = 151; // original only

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

async function fetchPokemons(): Promise<Pokemon[]> {
  let numbers = _genUniqueRandomIntegers();
  let pokemons: Pokemon[] = [];
  let promises = numbers.map((e) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${e}`)
  );

  try {
    let responses = await Promise.allSettled(promises);

    for (const resp of responses) {
      if (resp.status === "rejected") throw "Error trying to fetch";
      if (resp.value.status !== 200) throw "API server issues";
      let json = await resp.value.json();
      pokemons.push({
        id: json?.id,
        name: json?.name,
        picture: json?.sprites?.other["official-artwork"]?.front_default,
        types: json?.types?.map((e: any) => e?.type?.name),
      });
    }

    return pokemons;
  } catch (error) {
    console.log(error);
  }

  return [];
}

export { fetchPokemons };
