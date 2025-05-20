import { useEffect } from "react";

import { API } from "@/routes.config";

import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { selectState } from "@/lib/store/store";

import { User } from "@/types/enums/user.enum";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { useLoader } from "@/context/Loader/LoaderProvider";

export const useGetYourPlanOnLoad = (userFitnessPlan: boolean) => {
  const savedState = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  const { setLoading } = useLoader();

  useEffect(() => {
    console.log("userFitnessPlan", userFitnessPlan);

    if (userFitnessPlan) return;
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API.GET_PLAN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedState),
        });
        const responseData: FitPlan = await response.json();

        if (!responseData) {
          console.error("Invalid API response:", responseData);
          return;
        }

        dispatch(
          setUser({
            name: User.userFitnessPlan,
            value: responseData,
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
};
