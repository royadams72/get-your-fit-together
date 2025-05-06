import { createAppSlice } from "@/lib/store/createAppSlice";
import { UiData } from "@/types/enums/uiData.enum";
import { UiDataState, UiDataStore } from "@/types/interfaces/uiData";

export const uiDataSliceName = "uiData";

export const uiDataInitialState: UiDataState = {
  uiData: {
    [UiData.isEditing]: false,
    [UiData.isSignedIn]: false,
    [UiData.isRetrieving]: false,
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
  },
  selectors: {
    getUiDataState: (state: UiDataState) => state.uiData,
    getIsEditing: (state: UiDataState) => state.uiData.isEditing,
  },
});

export const { setUiData } = uiDataSlice.actions;
export const uiDataReducer = uiDataSlice.reducer;
export const { getUiDataState, getIsEditing } = uiDataSlice.selectors;
