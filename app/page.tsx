export const dynamic = "force-dynamic";
import FirstPage from "@/components/FirstPage";
import { getCopy } from "@/lib/services/copy.service";
import bcrypt from "bcryptjs";
const Home = async () => {
  const { copy } = await getCopy("firstPage");

  const userPassword = "password";
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt);
  const isMatch = bcrypt.compareSync(userPassword, hashedPassword);
  console.log("isMatch:::::::", userPassword, hashedPassword);

  return <FirstPage copy={copy} />;
};

export default Home;
