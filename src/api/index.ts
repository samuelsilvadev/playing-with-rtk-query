import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fakePokemonDetailData, fakePokemonListing } from "../mocks/data";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => {
    return {
      pokemonList: builder.query<typeof fakePokemonListing, void>({
        query: () => {
          return {
            url: "pokemon",
            method: "GET",
          };
        },
      }),
      pokemonDetails: builder.query<
        typeof fakePokemonDetailData,
        { name: string }
      >({
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
