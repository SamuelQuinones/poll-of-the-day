import { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./Form/slice";
import { viewReducer } from "./View/slice";
import { voteReducer } from "./Votes/slice";

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

const StoreProvider: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
