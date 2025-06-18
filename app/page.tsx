// export const dynamic = "force-dynamic";
import FirstPage from "@/components/FirstPage";
import { getCopy } from "@/lib/services/getCopy";
const Home = async () => {
  const { copy } = await getCopy("firstPage");

  return <FirstPage copy={copy} />;
};

export default Home;
