export const API = {
  RETRIEVE: "api/retrieve-plan",
  GET_PLAN: "/api/get-plan",
  SAVE_PLAN: "/api/save-plan",
  CHECK_USER: "/api/check-for-user",
  SET_REDIS: "/api/set-redis",
  GET_REDIS: "/api/get-redis",
};

export const JOURNEY_PATHS = [
  "/about-you",
  "/injuries",
  "/your-goals",
  "/preferences",
  "/your-custom-fit",
];

export const PATHS = {
  ABOUT_YOU: JOURNEY_PATHS[0],
  INJURIES: JOURNEY_PATHS[1],
  YOUR_GOALS: JOURNEY_PATHS[2],
  PREFERENCES: JOURNEY_PATHS[3],
  YOUR_FIT: JOURNEY_PATHS[4],
  RETRIEVE_PLAN: "/retrieve-plan",
  SUCCESS: "/success",
  ERROR: "/error",
};
