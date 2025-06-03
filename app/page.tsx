export const dynamic = "force-dynamic";
import Button from "@/components/Button";
import CopyComponent from "@/components/CopyComponent";
import { getCopy } from "@/lib/services/getCopy";
const Home = async () => {
  const { copy } = await getCopy("firstPage");

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

export default Home;
