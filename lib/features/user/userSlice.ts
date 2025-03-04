import { createAppSlice } from "@/lib/store/createAppSlice";
import { YourGoalsState, YourGoalsStore } from "@/types/interfaces/your-goals";

export const userSliceName = "user";

export interface UserStore {
  userPassword: string;
}
export interface UserState {
  user: UserStore;
}
export const userInitialState: UserState = {
  user: {
    userPassword: "",
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
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserState } = userSlice.selectors;
