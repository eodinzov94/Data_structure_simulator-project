import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAnimate: false,
  isPlaying: false,
};

const animationControlSlice = createSlice({
  name: "AnimationController",
  initialState,
  reducers: {
    init(state) {
      state = initialState;
    },
    SetIsAnimate(state, action: PayloadAction<boolean>) {
      state.isAnimate = action.payload;
    },
    SetIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export default animationControlSlice.reducer;
export const animationControlActions = animationControlSlice.actions;
