import { createAppSlice } from "@/lib/store/createAppSlice";
import { aboutYouState, aboutYouStore } from "@/types/interfaces/about-you";

export const aboutYouInitialState: aboutYouState = {
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
  name: "aboutYou",
  initialState: aboutYouInitialState,
  reducers: {
    setAboutYou: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof aboutYouStore;
        value: string;
      } = action.payload;
      state.aboutYou[name] = value;
    },
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
