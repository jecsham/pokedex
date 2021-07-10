import { useEffect, useState } from "react";
import { fetchPokemons, Pokemon } from "../../adapters/http-pokemon";
import ErrorAlert from "../../components/Erroralert";
import Card from "./Card";

interface ComponentState {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

function Home() {
  const [state, setState] = useState<ComponentState>({
    items: [],
    isLoading: true,
    error: null,
  });

  const loadPokemons = async () => {
    let response = await fetchPokemons();
    if (!response.success)
      return setState({ ...state, error: response.message });
    setState({
      ...state,
      items: Array.from(response.result, ([n, v]) => ({
        name: n,
        id: v?.id,
        picture: v?.picture,
        types: v?.types,
      })),
      isLoading: false,
      error: null,
    });
  };

  const renderPlaceholder = () => {
    if (state.error) return <ErrorAlert message={state.error} />;
    if (state.isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return state.items.map((item) => (
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
