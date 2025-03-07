import { createAppSlice } from "@/lib/store/createAppSlice";
import { UserState, UserStore } from "@/types/enums/user.enums";

export const userSliceName = "user";

export const userInitialState: UserState = {
  user: {
    userName: "",
    userPassword: "",
    userFitnessPlan: "",
  },
};

export const userSlice = createAppSlice({
  name: userSliceName,
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof UserStore;
        value: string;
      } = action.payload;
      state.user[name] = value;
    },
  },
  selectors: {
    getUserState: (state: UserState) => state.user,
    getUserFitnessPlan: (state: UserState) => state.user.userFitnessPlan,
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserState, getUserFitnessPlan } = userSlice.selectors;
