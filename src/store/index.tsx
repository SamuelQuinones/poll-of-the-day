import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./slice/Form";
import { viewReducer } from "./slice/View";
import { voteReducer } from "./slice/Votes";

export function makeStore() {
  return configureStore({
    reducer: {
      formValues: formReducer,
      currentView: viewReducer,
      currentVotes: voteReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
