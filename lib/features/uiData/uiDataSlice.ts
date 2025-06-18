import { createAppSlice } from "@/lib/store/createAppSlice";
import { UiData } from "@/types/enums/uiData.enum";
import { UiDataState, UiDataStore } from "@/types/interfaces/uiData";

export const uiDataSliceName = "uiData";

export const uiDataInitialState: UiDataState = {
  uiData: {
    [UiData.isSignedIn]: false,
    [UiData.isRetrieving]: false,
    [UiData.isEditing]: false,
    [UiData.sessionCookie]: "",
  },
};

export const uiDataSlice = createAppSlice({
  name: uiDataSliceName,
  initialState: uiDataInitialState,
  reducers: {
    setUiData: <K extends keyof UiDataStore>(
      state: UiDataState,
      action: { payload: { name: K; value: UiDataStore[K] } }
    ) => {
      state.uiData[action.payload.name] = action.payload.value;
    },
    setUiDataForRetreive: (state: UiDataState) => {
      state.uiData.isEditing = true;
      state.uiData.isRetrieving = true;
      state.uiData.isSignedIn = true;
    },
  },
  selectors: {
    getUiDataState: (state: UiDataState) => state.uiData,
    getIsSignedIn: (state: UiDataState) => state.uiData.isSignedIn,
    getSessionCookie: (state: UiDataState) => state.uiData.sessionCookie,
    getIsRetrieving: (state: UiDataState) => state.uiData.isRetrieving,
  },
});

export const { setUiData, setUiDataForRetreive } = uiDataSlice.actions;
export const uiDataReducer = uiDataSlice.reducer;
export const {
  getUiDataState,
  getIsSignedIn,
  getSessionCookie,
  getIsRetrieving,
} = uiDataSlice.selectors;
