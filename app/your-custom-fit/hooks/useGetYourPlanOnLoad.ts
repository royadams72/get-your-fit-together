import { useEffect } from "react";

import { API } from "@/routes.config";

import { setUser } from "@/lib/features/user/userSlice";
import { getUiDataState, setUiData } from "@/lib/features/ui-data/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { selectState } from "@/lib/store/store";

import { User } from "@/types/enums/user.enum";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { useLoader } from "@/context/Loader/LoaderProvider";
import { savePlan } from "../components/YourFit";
import { UiData } from "@/types/enums/uiData.enum";

export const useGetYourPlanOnLoad = () => {
  const savedState = useAppSelector(selectState);
  const getUiState = useAppSelector(getUiDataState);
  const dispatch = useAppDispatch();
  const { setLoading } = useLoader();

  useEffect(() => {
    console.log("getUiState.isEditing", getUiState.isEditing);

    if (!getUiState.isEditing) return;
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
        dispatch(setUiData({ name: UiData.isEditing, value: false }));
        console.log("savedState", savedState);
        if (getUiState.isRetrieving) {
          await savePlan({ savedState });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
};
