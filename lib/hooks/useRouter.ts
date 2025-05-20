import { useRouter as useNextRouter } from "next/navigation";

export const useRouter = () => {
  const { push: nextPush, replace: nextReplace, ...rest } = useNextRouter();

  const customQuery = ({
    pathname,
    query,
  }: {
    pathname: string;
    query: Record<string, any>;
  }) => {
    const generateQuery = new URLSearchParams(query).toString();
    const url = `${pathname}?${generateQuery}`;

    if (nextReplace) {
      nextReplace(url);
      return { ...rest, replace: customQuery };
    } else {
      nextPush(url);
      return { ...rest, push: customQuery };
    }
  };

  return { ...rest, push: customQuery, replace: customQuery };
};
