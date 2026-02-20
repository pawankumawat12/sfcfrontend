import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import sidebarReducer from "./features/sidebarSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import authReducers from "../redux/features/authSlice";
import persistStore from "redux-persist/es/persistStore";
import { ProductCategoryApi } from "./services/productCategoryApi";
import { ProductApi } from "./services/productApi";
export const authPersistConfig = {
  key: "auth",
  storage,
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducers);

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: persistAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [ProductCategoryApi.reducerPath]: ProductCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ProductCategoryApi.middleware,
      ProductApi.middleware
    ),
});

export const persistor = persistStore(store);
