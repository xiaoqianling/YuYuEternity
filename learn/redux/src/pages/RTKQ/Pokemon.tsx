import { useGetPokemonByNameQuery } from "@/lib/services/pokemonApi";
import { useState } from "react";
import "./RTKQBase.css";

const pokemon = ["bulbasaur", "pikachu", "ditto", "bulbasaur"];

function RTKQBase() {
  const [pollingInterval, setPollingInterval] = useState(0);
  return (
    <div className="RTKQContainer">
      <select
        title="Polling Interval"
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
        ))}
      </div>
    </div>
  );
}

export default RTKQBase;

interface Props {
  name: string;
  pollingInterval: number;
}
function Pokemon({ name, pollingInterval }: Props) {
  // isLoading只有第一次加载时才会为true，之后isLoading为false
  // isFetching只有在pollingInterval不为0时才会为true，之后isFetching为false
  const { data, isLoading, error, isFetching } = useGetPokemonByNameQuery(
    name,
    { pollingInterval },
  );

  if (error) {
    return <div className="pokemon">Error Occurs!</div>;
  }

  if (isLoading) {
    return <div className="pokemon">Loading...</div>;
  }

  if (isFetching) {
    return <div className="pokemon">Fetching...</div>;
  }

  return (
    <div className="pokemon">
      <h3>
        {data.species.name} {isFetching ? "..." : ""}
      </h3>
      <img src={data.sprites.front_shiny} alt={data.species.name} />
      <p>
        State: {isLoading && "isLoading"} {isFetching && "isFetching"}
      </p>
    </div>
  );
}
