import { createAppSlice } from "@/lib/store/createAppSlice";
import { AboutYouState, AboutYouStore } from "@/types/interfaces/about-you";

export const aboutYouSliceName = "aboutYou";

export const aboutYouInitialState: AboutYouState = {
  aboutYou: {
    experienceLevel: "",
    alcoholConsumption: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    bodyType: "",
    stressLevel: "",
    smoking: "",
    activityLevel: "",
  },
};

export const aboutYouSlice = createAppSlice({
  name: aboutYouSliceName,
  initialState: aboutYouInitialState,
  reducers: {
    setAboutYou: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof AboutYouStore;
        value: string;
      } = action.payload;
      state.aboutYou[name] = value;
    },
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
