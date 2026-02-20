import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";
import { api } from "../services/api";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  [api.reducerPath]: api.reducer,
});
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
