import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiConfig } from "../../constants/Api";
// import { api } from "./api";
import { baseQueryWithReauth } from "./baseApi";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    //get all products
    GetProducts: builder.query({
      query: ({
        page = 1,
        limit = 10,
        category,
        search = "",
        sort,
        isActive,
        isFeatured,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (isActive !== undefined) params.append("isActive", isActive);
        if (isFeatured !== undefined) params.append("isFeatured", isFeatured);
        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
        providesTags: ["Products"];
      },
    }),

    //add products
    createProduct: builder.mutation({
      query: (body) => ({
        url: ApiConfig.createProduct,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    //get product
    getProduct: builder.query({
      query: (slug) => ({
        url: `/product/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductQuery,
} = ProductApi;
