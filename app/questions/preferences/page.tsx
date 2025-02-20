import StoreProvider from "@/app/StoreProvider";
import PreferencesQuestions from "@/app/questions/preferences/components/PreferencesQuestions";

const Preferences = () => {
  return (
    <StoreProvider>
      <PreferencesQuestions />
    </StoreProvider>
  );
};

export default Preferences;
