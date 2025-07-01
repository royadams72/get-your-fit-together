import { State } from "@/types/interfaces/store";
import retrieveAndSetStore from "@/lib/server-functions/retrieveAndSetStore";
import YourFitWrapper from "@/app/your-custom-fit/components/YourFitWrapper";

export default async function YourCustomFitPage() {
  const result = await retrieveAndSetStore();

  return <YourFitWrapper preloadedState={result as State}></YourFitWrapper>;
}
