import { State } from "@/types/interfaces/store";
import retrieveAndSetStore from "@/lib/server-functions/retrieveAndSetStore";
import YourFitWrapper from "@/app/your-custom-fit/components/YourFitWrapper";

import { redirectOnError } from "@/lib/utils/redirectOnError";

export default async function YourCustomFitPage() {
  const result = await retrieveAndSetStore();
  redirectOnError(result as { redirect: boolean });
  return <YourFitWrapper preloadedState={result as State}></YourFitWrapper>;
}
