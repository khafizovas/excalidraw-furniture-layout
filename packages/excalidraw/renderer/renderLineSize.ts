import type { ExcalidrawLinearElement } from "../element/types";
import type { InteractiveCanvasAppState } from "../types";
import type { Coordinates2D } from "./elementSizeHelpers";
import {
  getElementSizeLabelCoord,
  getElementSizeLabelText,
  writeElementSizeToCanvas,
} from "./elementSizeHelpers";

export const renderSelectedLineSize = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  line: ExcalidrawLinearElement,
): void => {
  if (line.points.length > 2) {
    return;
  }

  const { gridStep = 0, gridSize = 0 } = appState;
  const { strokeColor, width, height } = line;

  const labelPosition = getElementSizeLabelCoord(
    line,
    getLineRightPoint,
    gridSize,
  );
  const labelText = getElementSizeLabelText(
    width,
    height,
    gridSize,
    gridStep,
    true,
  );

  writeElementSizeToCanvas(context, labelText, labelPosition, strokeColor);
};

const getLineRightPoint = (
  line: ExcalidrawLinearElement,
  offset: number,
): Coordinates2D => {
  const { x, y, points, angle, width, height } = line;

  const endPoint = points[1];
  const isEndPointLeft = endPoint[0] < 0;

  const leftPoint = isEndPointLeft
    ? { x: x + endPoint[0], y: y + endPoint[1] }
    : { x, y };
  const rightPoint = isEndPointLeft
    ? { x, y }
    : { x: x + endPoint[0], y: y + endPoint[1] };

  const initialAngle = Math.atan2(height, width);

  let absoluteAngle = angle - initialAngle;
  if (absoluteAngle < 0) {
    absoluteAngle += 2 * Math.PI;
  }

  const normalizedAngle = absoluteAngle % (2 * Math.PI);
  const shouldSwapPoints =
    normalizedAngle > Math.PI / 2 && normalizedAngle < Math.PI;

  const resultRightPoint = shouldSwapPoints
    ? { x: leftPoint.x - offset, y: leftPoint.y - offset }
    : { x: rightPoint.x + offset, y: rightPoint.y - offset };

  return resultRightPoint;
};
