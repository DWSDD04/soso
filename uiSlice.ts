import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  title: string;
  footerText: string;
}

const initialState: UIState = {
  title: "Welcome",
  footerText: "Rima's Beauty Salon",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setFooterText: (state, action: PayloadAction<string>) => {
      state.footerText = action.payload;
    },
  },
});

export const { setTitle, setFooterText } = uiSlice.actions;
export default uiSlice.reducer;
