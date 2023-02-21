import React from "react";
import "./App.css";
import { pokemonApi } from "./api";

const { usePokemonListQuery, usePokemonDetailsQuery } = pokemonApi;

function App() {
  const [selectedPokemon, selectPokemon] = React.useState<string | undefined>();

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
      </header>
      <main>
        {selectedPokemon ? (
          <>
            <PokemonDetails pokemonName={selectedPokemon} />
            <button onClick={() => selectPokemon(undefined)}>back</button>
          </>
        ) : (
          <PokemonList onPokemonSelected={selectPokemon} />
        )}
      </main>
    </>
  );
}

type PokemonListProps = {
  onPokemonSelected: (pokemonName: string | undefined) => void;
};

function PokemonList({ onPokemonSelected }: PokemonListProps) {
  const { data, isLoading, isError } = usePokemonListQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error to load list of pokemons</p>;
  }

  return (
    <article>
      <h2>Overview</h2>
      <ol start={1}>
        {data?.results.map((pokemon) => (
          <li key={pokemon.name}>
            <button onClick={() => onPokemonSelected(pokemon.name)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}

type PokemonDetailsProps = {
  pokemonName: string;
};

function PokemonDetails({ pokemonName }: PokemonDetailsProps) {
  const { data, isLoading, isError } = usePokemonDetailsQuery({
    name: pokemonName,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error to load pokemon details</p>;
  }

  if (!data) {
    return <p>Pokemon details not found</p>;
  }

  return (
    <article>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <ul>
        <li>id: {data.id}</li>
        <li>height: {data.height}</li>
        <li>weight: {data.weight}</li>
        <li>
          types:
          {data.types.map((item) => item.type.name)}
        </li>
      </ul>
    </article>
  );
}

export default App;
