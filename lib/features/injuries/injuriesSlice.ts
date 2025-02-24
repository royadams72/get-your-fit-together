import { createAppSlice } from "@/lib/store/createAppSlice";
import { InjuriesState, InjuriesStore } from "@/types/interfaces/injuries";

export const injuriesSliceName = "injuries";

export const injuriesInitialState: InjuriesState = {
  injuries: {
    upperBody: "",
    lowerBody: "",
    generalConditions: "",
    medicalRestrictions: "",
    foodAllergies: "",
    otherSensitivities: "",
  },
};

export const injuriesSlice = createAppSlice({
  name: injuriesSliceName,
  initialState: injuriesInitialState,
  reducers: {
    setInjurie: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof InjuriesStore;
        value: string;
      } = action.payload;
      state.injuries[name] = value;
    },
  },
});

export const { setInjurie } = injuriesSlice.actions;
export const injuriesReducer = injuriesSlice.reducer;
