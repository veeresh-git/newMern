"use client";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-community/async-storage";
// import { PersistGate } from "redux-persist/integration/react";
import authReducer from "../store";

// const persistConfig = { key: "root", storage: AsyncStorage, version: 1 };
// const PersistReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: authReducer,
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware<any>({
  //       serializableCheck: {
  //         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}

export default StoreProvider;
