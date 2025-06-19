import { UiData } from "../enums/uiData.enum";

export type UiDataStore = {
  [key in UiData]: boolean | string;
};
export interface UiDataState {
  uiData: UiDataStore;
}
