import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import YourFitWrapper from "./components/YourFitWrapper";
import { State } from "@/types/interfaces/store";
import { PersistPartial } from "redux-persist/es/persistReducer";

export default async function YourCustomFitPage() {
  const preloadedState = await retrieveAndSetStore();

  return (
    <YourFitWrapper
      preloadedState={preloadedState as State & PersistPartial}
    ></YourFitWrapper>
  );
}
