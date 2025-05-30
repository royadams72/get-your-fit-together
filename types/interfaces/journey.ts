export interface JourneyState {
  journey: JourneyStore;
}
export interface JourneyStore {
  journeyData: JourneyData[];
  routes: {
    currentRoute: string;
    nextRoute: string;
    prevRoute: string;
  };
}

export interface JourneyData {
  name: string;
  isComplete: boolean;
  canNavigate: boolean;
}
