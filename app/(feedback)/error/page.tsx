import Error from "./components/Error";

import { getLastErrorMessage } from "@/lib/server-functions/getErrorLog";

const page = async () => {
  const error = await getLastErrorMessage();
  console.log("error page:", error);

  return <Error error={error} />;
};

export default page;
