import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "localhost:8080/" }),
  // ※ 缓存数据和自动失效
  tagTypes: ["User", "Test"],
  endpoints: (builder) => ({
    getUser: builder.query<string, number>({
      // 一组处理请求的方法
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
      },
      transformResponse: (response: { data: string }) => {
        return response.data;
      },
      // 确定缓存类型和id
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    addUser: builder.mutation<boolean, string>({
      query: (name: string) => `/user/?name=${name}`,
      // id用于更细粒度的控制失效范围， type标定为tagTypes的其中一个确定的值
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

// 这里的Hooks是自动生成的，命名：use+endpoints的名称+Query/Mutation
export const { useGetUserQuery, useAddUserMutation } = userApi;

// Hooks state
const { data, isError, isLoading, error, currentData } = useGetUserQuery(1);
