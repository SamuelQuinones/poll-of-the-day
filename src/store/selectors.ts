import { RootState } from "store";

//* Form
export const getQuestion = (state: RootState) => state.formValues.question;
export const getOptions = (state: RootState) => state.formValues.options;

//* View
export const getCurrentView = (state: RootState) => state.currentView.view;

//* Votes
//* the only way to dynamically get everything we need is to take the entire current vote state...
export const getCurrentVote = (state: RootState) => state.currentVotes;
