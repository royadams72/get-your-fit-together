import { AboutYouQuestions } from "../enums/about-you.enum";

export interface aboutYouStore {
  [AboutYouQuestions.experienceLevel]: string;
  [AboutYouQuestions.alcoholConsumption]: string;
  [AboutYouQuestions.gender]: string;
  [AboutYouQuestions.age]: string;
  [AboutYouQuestions.height]: string;
  [AboutYouQuestions.weight]: string;
  [AboutYouQuestions.bodyType]: string;
  [AboutYouQuestions.stressLevel]: string;
  [AboutYouQuestions.smoking]: string;
  [AboutYouQuestions.activityLevel]: string;
}

export interface aboutYouState {
  aboutYou: aboutYouStore;
}
