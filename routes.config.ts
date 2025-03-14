export const API = {
  RETRIEVE: "api/retrieve-plan",
  GET_PLAN: "/api/get-plan",
  SAVE_PLAN: "/api/save-plan",
};

export const JOURNEY_PATHS = [
  "about-you",
  "injuries",
  "your-goals",
  "preferences",
  "your-custom-fit",
];

export const QUESTIONS_PATH = "/questions";

export const JOURNEY = {
  ABOUT_YOU: `${QUESTIONS_PATH}/${JOURNEY_PATHS[0]}`,
  INJURIES: `${QUESTIONS_PATH}/${JOURNEY_PATHS[1]}`,
  YOUR_GAOLS: `${QUESTIONS_PATH}/${JOURNEY_PATHS[2]}`,
  PREFERENCES: `${QUESTIONS_PATH}/${JOURNEY_PATHS[3]}`,
  YOUR_FIT: `${QUESTIONS_PATH}/${JOURNEY_PATHS[4]}`,
};
