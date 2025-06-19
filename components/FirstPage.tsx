import { KeyValueMap } from "@/types/interfaces/KeyValueMap";
import Button from "./Button";
import CopyComponent from "./CopyComponent";

const FirstPage = ({ copy }: { copy: KeyValueMap[] }) => {
  return (
    <>
      <div>
        <CopyComponent copy={copy} />
      </div>
      <div className="btnContainer">
        <Button href={"questions/about-you"}>
          Get Started With Your Fitness Plan
        </Button>
        <Button inverted={true} href={"retrieve-plan"}>
          Retrieve Your Fitness Plan
        </Button>
      </div>
      <div className="coach-image"></div>
    </>
  );
};

export default FirstPage;
