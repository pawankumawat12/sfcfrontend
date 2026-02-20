import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiConfig } from "../../constants/Api";
import { baseQueryWithReauth } from "./baseApi";

export const ProductCategoryApi = createApi({
  reducerPath: "/product/category",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    //get categories
    productCategory: builder.query({
      query: () => ({
        url: ApiConfig.allProductCategory,
        method: "GET",
      }),
      providesTags: ["ProductCategory"],
    }),

    //add categories
    CreateProductCategory: builder.mutation({
      query: (data) => ({
        url: ApiConfig.createProductCategory,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductCategory"],
    }),

    //get category by id
    GetPorductCategoryApi: builder.query({
      query: (id) => ({
        url: `/product/category/${id}`,
        method: "GET",
      }),
    }),

    //edit category by id
    editProductCategoryApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/category/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProductCategory"],
    }),

    //get leaf categories
    getLeafProductCategories: builder.query({
      query: () => ({
        url: "/product/category/leaf",
        method: "GET",
      }),
    }),

  }),
});
export const {
  useProductCategoryQuery,
  useCreateProductCategoryMutation,
  useGetPorductCategoryApiQuery,
  useEditProductCategoryApiMutation,
  useGetLeafProductCategoriesQuery,
  useGetChildProductCategoriesQuery,
} = ProductCategoryApi;
