import { createAppSlice } from "@/lib/store/createAppSlice";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { UserState, UserStore } from "@/types/interfaces/user";

export const userSliceName = "user";

export const userInitialState: UserState = {
  user: {
    userName: "",
    userPassword: "",
    userFitnessPlan: {} as FitPlan,
  },
};

export const userSlice = createAppSlice({
  name: userSliceName,
  initialState: userInitialState,
  reducers: {
    setUser: <K extends keyof UserStore>(
      state: UserState,
      action: { payload: { name: K; value: UserStore[K] } }
    ) => {
      state.user[action.payload.name] = action.payload.value;
    },
  },
  selectors: {
    getUserState: (state: UserState) => state.user,
    getUserName: (state: UserState) => state.user.userName,
    getUserFitnessPlan: (state: UserState) => state.user.userFitnessPlan,
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserState, getUserFitnessPlan, getUserName } =
  userSlice.selectors;
