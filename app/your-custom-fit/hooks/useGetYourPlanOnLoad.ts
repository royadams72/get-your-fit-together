import { useEffect } from "react";

import { API } from "@/routes.config";

import { setUser } from "@/lib/features/user/userSlice";
import { getUiDataState, setUiData } from "@/lib/features/ui-data/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
// import { useClientFetch } from "@/lib/hooks/useClientFetch";

import { selectState } from "@/lib/store/store";

import { fetchHelper } from "@/lib/actions/fetchHelper";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { User } from "@/types/enums/user.enum";

import { useLoader } from "@/context/Loader/LoaderProvider";

import { UiData } from "@/types/enums/uiData.enum";

export const useGetYourPlanOnLoad = () => {
  // const clientFetch = useClientFetch();
  const savedState = useAppSelector(selectState);
  const getUiState = useAppSelector(getUiDataState);
  const dispatch = useAppDispatch();
  const { setLoading } = useLoader();

  useEffect(() => {
    if (!getUiState.isEditing) return;
    (async () => {
      setLoading(true);
      try {
        const response: FitPlan = await fetchHelper(API.GET_PLAN, savedState);

        if (response) {
          dispatch(
            setUser({
              name: User.userFitnessPlan,
              value: response,
            })
          );

          dispatch(setUiData({ name: UiData.isEditing, value: false }));
        }

        if (getUiState.isRetrieving) {
          await fetchHelper(API.SAVE_PLAN, { savedState });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
};
