import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    // 定义类型：query<返回类型，参数类型>
    getPokemonByName: builder.query<string, string>({
      // 缓存策略，30秒内不重新请求 或变更失效后重新请求
      keepUnusedDataFor: 30,
      query: (name: string) => `pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: "Pokemon", id: 1 }],
      transformResponse: (response) => "1",
    }),
    test: builder.mutation({
      query: () => ({
        url: "pokemon/1",
        params: { limit: 10 },
        method: "GET",
      }),
      invalidatesTags: ["Pokemon"],
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
