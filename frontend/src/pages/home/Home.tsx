import { useEffect, useState } from "react";
import { fetchPokemons, Pokemon } from "../../adapters/http-pokemon";
import Card from "./Card";

function Home() {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadPokemons = async () => {
    let map = await fetchPokemons();
    if (map) {
      setItems(
        Array.from(map, ([n, v]) => ({
          name: n,
          id: v?.id,
          picture: v?.picture,
          types: v?.types,
        }))
      );
    }
    setIsLoading(false);
  };

  const renderPlaceholder = () => {
    if (isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return items.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-lg-4 g-3">
          <Card name={item.name} picture={item.picture} />
        </div>
      ));
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Pokemons</h3>
        </div>
      </div>
      <div className="row justify-content-center">{renderPlaceholder()}</div>
    </div>
  );
}
export default Home;
