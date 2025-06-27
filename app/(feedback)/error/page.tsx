import Error from "./components/Error";

import { getLastErrorMessage } from "@/lib/server-functions/getErrorLog";

const page = async () => {
  const error = await getLastErrorMessage();

  return <Error error={error} />;
};

export default page;
