import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fakePokemonDetailData, fakePokemonListing } from "../mocks/data";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => {
    return {
      pokemonList: builder.query<typeof fakePokemonListing, void>({
        queryFn() {
          return {
            data: fakePokemonListing,
          };
        },
      }),
      pokemonDetails: builder.query<typeof fakePokemonDetailData, void>({
        queryFn() {
          return {
            data: fakePokemonDetailData,
          };
        },
      }),
    };
  },
});
