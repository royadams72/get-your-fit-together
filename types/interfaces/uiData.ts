import { UiData } from "../enums/uiData.enum";

export type UiDataStore = {
  [key in UiData]: boolean;
};
export interface UiDataState {
  uiData: UiDataStore;
}
