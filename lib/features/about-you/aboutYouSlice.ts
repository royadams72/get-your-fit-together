import { createAppSlice } from "@/lib/store/createAppSlice";
import { AboutYou } from "@/types/enums/about-you.enum";
import { AboutYouState, AboutYouStore } from "@/types/interfaces/about-you";

export const aboutYouSliceName = "aboutYou";

export const aboutYouInitialState: AboutYouState = {
  aboutYou: {
    [AboutYou.experienceLevel]: "",
    [AboutYou.alcoholConsumption]: "",
    [AboutYou.gender]: "",
    [AboutYou.age]: "",
    [AboutYou.height]: "",
    [AboutYou.weight]: "",
    [AboutYou.bodyType]: "",
    [AboutYou.stressLevel]: "",
    [AboutYou.smoking]: "",
    [AboutYou.activityLevel]: "",
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
  selectors: {
    getAboutYouState: (state: AboutYouState) => state.aboutYou,
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
export const { getAboutYouState } = aboutYouSlice.selectors;
