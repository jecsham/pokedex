import { useEffect, useState } from "react";
import { fetchPokemons, Pokemon } from "../../adapters/http-pokemon";
import Card from "./Card";

function Home() {
  const [items, setItems] = useState<Pokemon[]>([]);

  const loadPokemons = async () => {
    setItems(await fetchPokemons());
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        {items.map((item) => (
        <div className="col-12 col-sm-6 col-lg-4 g-3">
          <Card name={item.name} picture={item.picture}/>
        </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
