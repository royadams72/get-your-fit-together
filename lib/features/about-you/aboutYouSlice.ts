import { createAppSlice } from "@/lib/store/createAppSlice";
import { AboutYouQuestions } from "@/types/enums/about-you.enum";

export interface aboutYouStore {
  experienceLevel: AboutYouQuestions.experienceLevel;
  alcholConsumption: AboutYouQuestions.alcoholConsumption;
  gender: AboutYouQuestions.gender;
  age: AboutYouQuestions.age;
}

export interface aboutYouState {
  aboutYou: aboutYouStore;
}

export const aboutYouInitialState = {
  aboutYou: { experienceLevel: "", alcholConsumption: "", gender: "", age: "" },
};

export const aboutYouSlice = createAppSlice({
  name: "aboutYou",
  initialState: aboutYouInitialState,
  reducers: {
    setAboutYou: (state, action) => {
      const { name, value }: { name: keyof aboutYouStore; value: string } =
        action.payload;
      state.aboutYou[name] = value;
    },
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
