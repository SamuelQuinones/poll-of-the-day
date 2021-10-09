import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VoteState = {
  [key: `option${number}`]: number | undefined;
};

const initialState: VoteState = {
  option1: 0,
  option2: 0,
};

const slice = createSlice({
  name: "voteState",
  initialState,
  reducers: {
    reset(state) {
      const current = Object.keys(state);
      for (let i = 0; i < current.length; i++) {
        state[`option${i + 1}`] = undefined;
      }
      state.option1 = 0;
      state.option2 = 0;
    },
    set(state, action: PayloadAction<{ option: number; count: number }>) {
      state[`option${action.payload.option}`] = action.payload.count;
    },
    increment(state, action: PayloadAction<number>) {
      const current = state[`option${action.payload}`];
      if (current) {
        state[`option${action.payload}`] = current + 1;
      } else {
        state[`option${action.payload}`] = 1;
      }
    },
  },
});

export const { actions: voteActions, reducer: voteReducer } = slice;
