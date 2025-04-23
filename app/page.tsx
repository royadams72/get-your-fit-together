import Button from "@/components/Button";
import CopyComponent from "@/components/CopyComponent";
import { getCopy } from "@/lib/actions/getCopy";

export const Home = async () => {
  const { copy } = await getCopy("firstPage");

  return (
    <div>
      <h1>
        Get Your <br />
        <span style={{ color: "var(--quaternary-colour)" }}>Fit</span> Together
      </h1>

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
    </div>
  );
};

export default Home;
