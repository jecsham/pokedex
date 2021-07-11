import { fetchPokemon, fetchPokemons } from "./pokemon";

const api = (app: any) => {
  app.get("/api/pokemons", async (req, res) => {
    let result = await fetchPokemons();
    res.json(result);
  });

  app.get("/api/pokemon/:name", async (req, res) => {
    let param = req.params.name;
    let result = await fetchPokemon(param);
    res.json(result);
  });
};

export { api };
