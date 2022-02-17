import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
};
export const LoadingSlice = createSlice({
  name: "LoadingSlice",
  initialState,
  reducers: {
    ShowLoading: (state) => {
      state.isLoading = true;
    },
    HideLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { ShowLoading, HideLoading } = LoadingSlice.actions;
export const LoadingSelector = (state) => state.loading;
export default LoadingSlice.reducer;