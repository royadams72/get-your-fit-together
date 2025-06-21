import { useEffect } from "react";

import { JOURNEY_PATHS, PATHS } from "@/routes.config";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/storeHooks";
import { UiData } from "@/types/enums/uiData.enum";

import { getUiDataState, setUiData } from "@/lib/features/uiData/uiDataSlice";
import { getRoutes } from "@/lib/features/journey/journeySlice";

export const useMarkAsEditingUntilYourFit = () => {
  const dispatch = useAppDispatch();
  const { currentRoute } = useAppSelector(getRoutes);
  const sessionCookie = useAppSelector(getUiDataState).sessionCookie;
  useEffect(() => {
    const index = JOURNEY_PATHS.findIndex((path) => path === PATHS.YOUR_FIT);
    const paths = JOURNEY_PATHS.slice(0, index);

    if (paths.includes(currentRoute)) {
      if (!sessionCookie) return;
      dispatch(setUiData({ name: UiData.isEditing, value: true }));
    }
  }, [currentRoute]);
};
