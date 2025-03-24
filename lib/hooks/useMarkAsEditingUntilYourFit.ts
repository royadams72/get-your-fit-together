import { JOURNEY_PATHS, PATHS } from "@/routes.config";
import { UiData } from "@/types/enums/uiData.enum";
import { useEffect } from "react";
import { setUiData } from "../features/ui-data/uiDataSlice";
import { getRoutes } from "../features/journey/journeySlice";
import { useAppSelector, useAppDispatch } from "./storeHooks";

const useMarkAsEditingUntilYourFit = () => {
  const { currentRoute } = useAppSelector(getRoutes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const index = JOURNEY_PATHS.findIndex((path) => path === PATHS.YOUR_FIT);
    const paths = JOURNEY_PATHS.slice(0, index);
    console.log(paths);

    if (paths.includes(currentRoute)) {
      dispatch(setUiData({ name: UiData.isEditing, value: true }));
      console.log({ value: true });
    }
  }, [currentRoute, dispatch]);
};
export default useMarkAsEditingUntilYourFit;
