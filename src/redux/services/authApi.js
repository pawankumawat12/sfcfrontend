import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "../../config/appConfig";
import { ApiConfig } from "../../constants/Api";
import { baseQueryWithReauth } from "./baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: ApiConfig.signUp,
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: ApiConfig.singIn,
        method: "POST",
        body,
      }),
    }),
    verify: builder.query({
      query: () => ({
        url: ApiConfig.verify,
        method: "POST",
      }),
    }),
    //signout
    signout: builder.mutation({
      query: () => ({
        url: ApiConfig.logout,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyQuery,
  useSignoutMutation,
} = authApi;
