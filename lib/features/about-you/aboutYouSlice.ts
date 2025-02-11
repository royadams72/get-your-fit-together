import { createAppSlice } from "@/lib/store/createAppSlice";

export interface aboutYouState {
  aboutYou: any;
}

export const aboutYouInitialState = {
  aboutYou: {},
};

export const aboutYouSlice = createAppSlice({
  name: "aboutYou",
  initialState: aboutYouInitialState,
  reducers: {
    setAboutYou: (state, action) => {
      state.aboutYou = action.payload;
    },
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
