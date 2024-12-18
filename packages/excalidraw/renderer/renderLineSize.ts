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
  const { x, y, points, width, height, angle } = line;

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  const isLastRight = lastPoint[0] > firstPoint[0];

  const initialAngle = Math.atan2(height, width);
  const absoluteAngle = getNormalizedAngle(initialAngle + angle);

  const isUpsideDown = Math.abs(absoluteAngle) > Math.PI / 2;

  if (isLastRight && !isUpsideDown) {
    return {
      x: x + lastPoint[0] + offset,
      y: y + lastPoint[1] - offset,
    };
  }

  return {
    x: x + firstPoint[0] + offset,
    y: y + firstPoint[1] - offset,
  };
};

// [-pi, pi]
const getNormalizedAngle = (angle: number): number => {
  let normalizedAngle = angle;

  while (normalizedAngle > Math.PI) {
    normalizedAngle -= 2 * Math.PI;
  }
  while (normalizedAngle < -Math.PI) {
    normalizedAngle += 2 * Math.PI;
  }

  return normalizedAngle;
};
