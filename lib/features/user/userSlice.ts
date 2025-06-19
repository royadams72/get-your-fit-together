import { createSelector } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/store/createAppSlice";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { RootState } from "@/types/interfaces/store";
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
    setUserInfo: (
      state: UserState,
      action: { payload: { userName: string; userPassword: string } }
    ) => {
      state.user.userName = action.payload.userName;
      state.user.userPassword = action.payload.userPassword;
    },
  },
  selectors: {
    getUserState: (state: UserState) => state.user,
    getUserName: (state: UserState) => state.user.userName,
    getUserFitnessPlan: (state: UserState) => state.user.userFitnessPlan,
    // getUserInfo: (state: UserState) => {
    //   return {
    //     userName: state.user.userName,
    //     userPassword: state.user.userPassword,
    //   };
    // },
  },
});

export const { setUser, setUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserState, getUserFitnessPlan, getUserName } =
  userSlice.selectors;

export const getUserInfo = createSelector(
  (state: RootState) => state.user,
  (user) => ({
    userName: user.user.userName,
    userPassword: user.user.userPassword,
  })
);
