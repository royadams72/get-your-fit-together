import { InjuriesQuestions } from "../enums/injuries.enum";

export interface injuriesStore {
  [InjuriesQuestions.upperBody]: string;
  [InjuriesQuestions.lowerBody]: string;
  [InjuriesQuestions.generalConditions]: string;
  [InjuriesQuestions.medicalRestrictions]: string;
  [InjuriesQuestions.foodAllergies]: string;
  [InjuriesQuestions.otherSensitivities]: string;
}

export interface injuriesState {
  injuries: injuriesStore;
}
