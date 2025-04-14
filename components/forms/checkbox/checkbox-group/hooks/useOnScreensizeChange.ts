import useScreenSize from "@/lib/hooks/useScreenSize";
import { BreakPoints } from "@/types/enums/break-points";
import { useState, useEffect } from "react";

const useOnScreensizeChange = (
  checkboxLength: number,
  colsLarge: number = 3,
  colsSmall: number = 2
) => {
  const { width } = useScreenSize();
  const [leftBottom, setLeftBottom] = useState<number>(0);
  const [rightTop, setRightTop] = useState<number>(0);

  const setRows = (cols: number, items: number) => Math.ceil(items / cols);

  const columns = width > BreakPoints.md ? colsLarge : colsSmall;

  useEffect(() => {
    const totalItems = checkboxLength;
    const rows = setRows(columns, totalItems);
    setLeftBottom((rows - 1) * columns + 1);
    setRightTop(columns);
  }, [width, colsLarge, colsSmall, checkboxLength, columns]);

  return { columns, leftBottom, rightTop };
};

export default useOnScreensizeChange;
