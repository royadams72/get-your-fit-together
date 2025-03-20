import { AboutYou } from "../enums/about-you.enum";

export type AboutYouStore = {
  [key in AboutYou]: string;
};

export interface AboutYouState {
  aboutYou: AboutYouStore;
}
