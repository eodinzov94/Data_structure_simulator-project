import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isSortStarted: false,
  isPlaying: false,
};

const animationControlSlice = createSlice({
  name: "AnimationController",
  initialState,
  reducers: {
    init(state) {
      state = initialState;
    },
    SetIsSortStarted(state, action: PayloadAction<boolean>) {
      state.isSortStarted = action.payload;
    },
    SetIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export default animationControlSlice.reducer;
export const animationControlActions = animationControlSlice.actions;
