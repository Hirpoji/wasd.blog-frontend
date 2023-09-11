import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  value: string;
}

const initialState: HomeState = {
  value: "Последние",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;