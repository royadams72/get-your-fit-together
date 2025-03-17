import { createAppSlice } from "@/lib/store/createAppSlice";
import { UserState, UserStore } from "@/types/interfaces/user";

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
    getUserName: (state: UserState) => state.user.userName,
    getUserFitnessPlan: (state: UserState) => state.user.userFitnessPlan,
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserState, getUserFitnessPlan, getUserName } =
  userSlice.selectors;
