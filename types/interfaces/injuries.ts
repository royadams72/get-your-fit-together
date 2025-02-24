import { InjuriesQuestions } from "../enums/injuries.enum";

export interface InjuriesStore {
  [InjuriesQuestions.upperBody]: string;
  [InjuriesQuestions.lowerBody]: string;
  [InjuriesQuestions.generalConditions]: string;
  [InjuriesQuestions.medicalRestrictions]: string;
  [InjuriesQuestions.foodAllergies]: string;
  [InjuriesQuestions.otherSensitivities]: string;
}

export interface InjuriesState {
  injuries: InjuriesStore;
}
