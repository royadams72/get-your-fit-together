import { createAppSlice } from "@/lib/store/createAppSlice";
import { injuriesState, injuriesStore } from "@/types/interfaces/injuries";

export const injuriesInitialState: injuriesState = {
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
  name: "injuries",
  initialState: injuriesInitialState,
  reducers: {
    setInjurie: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof injuriesStore;
        value: string;
      } = action.payload;
      state.injuries[name] = value;
    },
  },
});

export const { setInjurie } = injuriesSlice.actions;
export const injuriesReducer = injuriesSlice.reducer;
