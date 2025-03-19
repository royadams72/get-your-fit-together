import { Injuries } from "../enums/injuries.enum";

export interface InjuriesStore {
  [Injuries.upperBody]: string;
  [Injuries.lowerBody]: string;
  [Injuries.generalConditions]: string;
  [Injuries.medicalRestrictions]: string;
  [Injuries.foodAllergies]: string;
  [Injuries.otherSensitivities]: string;
}

export interface InjuriesState {
  injuries: InjuriesStore;
}
