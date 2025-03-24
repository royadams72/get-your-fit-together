import { useEffect } from "react";

import { JOURNEY_PATHS, PATHS } from "@/routes.config";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/storeHooks";
import { UiData } from "@/types/enums/uiData.enum";

import { setUiData } from "@/lib/features/ui-data/uiDataSlice";
import { getRoutes } from "@/lib/features/journey/journeySlice";

const useMarkAsEditingUntilYourFit = () => {
  const { currentRoute } = useAppSelector(getRoutes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const index = JOURNEY_PATHS.findIndex((path) => path === PATHS.YOUR_FIT);
    const paths = JOURNEY_PATHS.slice(0, index);

    if (paths.includes(currentRoute)) {
      dispatch(setUiData({ name: UiData.isEditing, value: true }));
    }
  }, [currentRoute, dispatch]);
};
export default useMarkAsEditingUntilYourFit;
