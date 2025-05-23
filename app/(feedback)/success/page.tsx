import Success from "./components/Success";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ message: string; mode?: string }>;
}) => {
  const { message, mode } = await searchParams;
  return <Success message={message} mode={mode} />;
};

export default page;
