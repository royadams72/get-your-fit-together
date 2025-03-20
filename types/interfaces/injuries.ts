import { Injuries } from "../enums/injuries.enum";

export type InjuriesStore = {
  [key in Injuries]: string;
};

export interface InjuriesState {
  injuries: InjuriesStore;
}
