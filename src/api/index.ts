import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: { front_default: string };
};

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => {
    return {
      pokemonList: builder.query<PokemonList, void>({
        query: () => {
          return {
            url: "pokemon",
            method: "GET",
          };
        },
      }),
      pokemonDetails: builder.query<PokemonDetails, { name: string }>({
        query: ({ name }) => {
          return {
            url: "pokemon/" + name,
            method: "GET",
          };
        },
      }),
    };
  },
});
