import Error from "./components/Error";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) => {
  const { error } = await searchParams;
  return <Error error={error} />;
};

export default page;
