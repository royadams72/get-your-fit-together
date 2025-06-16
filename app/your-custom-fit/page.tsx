import { redirect } from "next/navigation";
import { PersistPartial } from "redux-persist/es/persistReducer";
import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import { State } from "@/types/interfaces/store";
import YourFitWrapper from "@/app/your-custom-fit/components/YourFitWrapper";

export default async function YourCustomFitPage() {
  const preloadedState = await retrieveAndSetStore();
  console.log("YourCustomFitPage:", preloadedState);

  // if (!preloadedState) {
  //   redirect("/");
  // }

  return (
    <YourFitWrapper
      preloadedState={preloadedState as State & PersistPartial}
    ></YourFitWrapper>
  );
}
