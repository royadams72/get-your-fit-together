import { useLoader } from "@/context/Loader/LoaderProvider";
import { setUiData } from "@/lib/features/ui-data/uiDataSlice";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { selectState } from "@/lib/store/store";
import { API } from "@/routes.config";
import { UiData } from "@/types/enums/uiData.enum";
import { User } from "@/types/enums/user.enum";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { useEffect } from "react";

export const useGetYourPlanOnLoad = () => {
  const savedState = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  const { setLoading } = useLoader();

  const getPlan = async () => {
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
      dispatch(setUiData({ name: UiData.isEditing, value: false }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return getPlan;
};
