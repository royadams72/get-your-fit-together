import { State } from "@/types/interfaces/store";
import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import YourFitWrapper from "@/app/your-custom-fit/components/YourFitWrapper";
import { PATHS } from "@/routes.config";
import Redirect from "@/components/Redirect";

export default async function YourCustomFitPage() {
  const result = await retrieveAndSetStore();
  if (!result || (result && "redirect" in result && result.redirect)) {
    return (
      <Redirect
        redirectTo={PATHS.ERROR}
        query={result?.redirect?.error || undefined}
      />
    );
  }
  return <YourFitWrapper preloadedState={result as State}></YourFitWrapper>;
}
