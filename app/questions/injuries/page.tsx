import StoreProvider from "@/app/StoreProvider";
import InjuriesQuestions from "./components/InjuriesQuestions";

const Injuries = () => {
  return (
    <StoreProvider>
      <InjuriesQuestions />
    </StoreProvider>
  );
};

export default Injuries;
