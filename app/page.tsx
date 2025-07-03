export const dynamic = "force-dynamic";
import FirstPage from "@/components/FirstPage";
import { getCopy } from "@/lib/services/copy.service";
import bcrypt from "bcryptjs";
const Home = async () => {
  const { copy } = await getCopy("firstPage");

  return <FirstPage copy={copy} />;
};

export default Home;
