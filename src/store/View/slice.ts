import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewState = {
  view: "setup" | "poll" | "end";
};

const initialState: ViewState = {
  view: "setup",
};

const slice = createSlice({
  name: "viewState",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<"setup" | "poll" | "end">) {
      state.view = action.payload;
    },
  },
});

export const { actions: viewActions, reducer: viewReducer } = slice;
