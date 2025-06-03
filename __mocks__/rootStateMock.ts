import { JourneyState, JourneyStore } from "@/types/interfaces/journey";
import { reduxMock } from "./reduxMock";

export const rootStateMock = {};

export const journeySliceMock: JourneyState = reduxMock.journey;

// {
//   journey: {
//     journeyData: [
//       {
//         name: "/questions/about-you",
//         isComplete: true,
//         canNavigate: true,
//       },
//       {
//         name: "/questions/injuries",
//         isComplete: true,
//         canNavigate: true,
//       },
//       {
//         name: "/questions/your-goals",
//         isComplete: true,
//         canNavigate: true,
//       },
//       {
//         name: "/questions/preferences",
//         isComplete: true,
//         canNavigate: true,
//       },
//       {
//         name: "/your-custom-fit",
//         isComplete: true,
//         canNavigate: true,
//       },
//     ],
//     routes: {
//       currentRoute: "/your-custom-fit",
//       nextRoute: "",
//       prevRoute: "/questions/preferences",
//     },
//   },
// };
