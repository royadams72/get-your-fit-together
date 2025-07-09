"use client";
import { useOnNavigate } from "@/lib/hooks/useOnNavigate";
import Loader from "@/context/Loader/Loader";

const NavigationLoader = () => {
  const isLoading = useOnNavigate();
  console.log("NavigationLoader loading::", isLoading);

  if (!isLoading) return null;

  return <Loader isGeneric={true} />;
};

export default NavigationLoader;
