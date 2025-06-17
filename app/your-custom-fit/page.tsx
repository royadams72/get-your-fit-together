import { PersistPartial } from "redux-persist/es/persistReducer";
import { State } from "@/types/interfaces/store";
import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import YourFitWrapper from "@/app/your-custom-fit/components/YourFitWrapper";

export default async function YourCustomFitPage() {
  const preloadedState = await retrieveAndSetStore();

  return (
    <YourFitWrapper
      preloadedState={preloadedState as State & PersistPartial}
    ></YourFitWrapper>
  );
}
