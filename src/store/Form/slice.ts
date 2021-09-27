import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormValueState = {
  question: string;
  options: string[];
};

const initialState: FormValueState = {
  question: "",
  options: [],
};

const slice = createSlice({
  name: "formState",
  initialState,
  reducers: {
    reset(state) {
      state.question = "";
      state.options = [];
    },
    setQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
    setOptions(state, action: PayloadAction<string[]>) {
      state.options = Array.from(action.payload);
    },
    setOptionsFormValue(
      state,
      action: PayloadAction<Array<{ answer: string }>>
    ) {
      state.options = action.payload.map((item) => item.answer);
    },
  },
});

export const { actions: formActions, reducer: formReducer } = slice;
