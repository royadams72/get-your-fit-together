import { createAppSlice } from "@/lib/store/createAppSlice";
import { AboutYouQuestions } from "@/types/enums/about-you.enum";

export interface aboutYouStore {
  experienceLevel: string;
  alcholConsumption: string;
  gender: string;
  age: string;
  height: { unit: string; value: string };
}

export interface aboutYouState {
  aboutYou: aboutYouStore;
}

export const aboutYouInitialState: aboutYouState = {
  aboutYou: {
    experienceLevel: "",
    alcholConsumption: "",
    gender: "",
    age: "",
    height: { unit: "", value: "" },
  },
};

export const aboutYouSlice = createAppSlice({
  name: "aboutYou",
  initialState: aboutYouInitialState,
  reducers: {
    setAboutYou: (state, action) => {
      const { name, value }: { name: keyof aboutYouStore; value: any } =
        action.payload;
      state.aboutYou[name] = value;
    },
  },
});

export const { setAboutYou } = aboutYouSlice.actions;
export const aboutYouReducer = aboutYouSlice.reducer;
