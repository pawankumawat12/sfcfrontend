import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "../../config/appConfig";
import { ApiConfig } from "../../constants/Api";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.apiBaseUrl,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // refresh token call
    const refreshResult = await rawBaseQuery(
      {
        url: ApiConfig.refreshToken,
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // retry original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};
