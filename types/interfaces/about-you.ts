import { AboutYou } from "../enums/about-you.enum";

export interface AboutYouStore {
  [AboutYou.experienceLevel]: string;
  [AboutYou.alcoholConsumption]: string;
  [AboutYou.gender]: string;
  [AboutYou.age]: string;
  [AboutYou.height]: string;
  [AboutYou.weight]: string;
  [AboutYou.bodyType]: string;
  [AboutYou.stressLevel]: string;
  [AboutYou.smoking]: string;
  [AboutYou.activityLevel]: string;
}

export interface AboutYouState {
  aboutYou: AboutYouStore;
}
