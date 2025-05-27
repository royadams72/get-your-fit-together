import { createAppSlice } from "@/lib/store/createAppSlice";
import { Injuries } from "@/types/enums/injuries.enum";
import { InjuriesState, InjuriesStore } from "@/types/interfaces/injuries";

export const injuriesSliceName = "injuries";

export const injuriesInitialState: InjuriesState = {
  injuries: {
    [Injuries.upperBody]: "",
    [Injuries.lowerBody]: "",
    [Injuries.generalConditions]: "",
    [Injuries.medicalRestrictions]: "",
    [Injuries.foodAllergies]: "",
    [Injuries.otherSensitivities]: "",
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
  selectors: {
    getInjuriesState: (state: InjuriesState) => state.injuries,
  },
});

export const { setInjurie } = injuriesSlice.actions;
export const injuriesReducer = injuriesSlice.reducer;
export const { getInjuriesState } = injuriesSlice.selectors;
