import { useEffect } from "react";

import { API } from "@/routes.config";

import { setUser } from "@/lib/features/user/userSlice";
import { getUiDataState, setUiData } from "@/lib/features/ui-data/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { selectState } from "@/lib/store/store";

import { User } from "@/types/enums/user.enum";
import { useClientFetch } from "@/lib/services/clientFetch";

import { useLoader } from "@/context/Loader/LoaderProvider";

import { UiData } from "@/types/enums/uiData.enum";

export const useGetYourPlanOnLoad = () => {
  const clientFetch = useClientFetch();
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
        console.log("useGetYourPlanOnLoad", savedState);

        const response: FitPlan = await clientFetch(API.GET_PLAN, savedState);

        dispatch(
          setUser({
            name: User.userFitnessPlan,
            value: response,
          })
        );
        dispatch(setUiData({ name: UiData.isEditing, value: false }));
        console.log("savedState", savedState);
        if (getUiState.isRetrieving) {
          await clientFetch(API.SAVE_PLAN, { savedState });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
};
