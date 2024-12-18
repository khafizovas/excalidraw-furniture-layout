import type { ExcalidrawLinearElement } from "../element/types";
import type { InteractiveCanvasAppState } from "../types";

interface Coordinates2D {
  x: number;
  y: number;
}

export const renderSelectedLineSize = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  line: ExcalidrawLinearElement,
): void => {
  if (line.points.length > 2) {
    return;
  }

  const { gridStep = 0, gridSize = 0 } = appState;
  const { strokeColor, width } = line;

  const labelPosition = getLineSizeLabelCoord(line, gridSize);
  const labelText = getLineSizeLabelText(width, gridSize, gridStep);

  writeLineSizeToCanvas(context, labelText, labelPosition, strokeColor);
};

const getLineSizeLabelCoord = (
  line: ExcalidrawLinearElement,
  offset: number,
): Coordinates2D => {
  const { angle } = line;

  const center = getLineCenter(line);
  const rightPoint = getLineRightPoint(line);

  const vector = getLineSizeLabelVector(center, rightPoint);
  const rotatedVector = getLineSizeLabelRotatedVector(vector, angle);

  return {
    x: center.x + rotatedVector.x + offset,
    y: center.y + rotatedVector.y - offset,
  };
};

const getLineCenter = (line: ExcalidrawLinearElement): Coordinates2D => {
  const { x, y, width, height } = line;

  return {
    x: x + width / 2,
    y: y + height / 2,
  };
};

const getLineRightPoint = (line: ExcalidrawLinearElement): Coordinates2D => {
  const { x, y, points, width, height, angle } = line;

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  const isLastRight = lastPoint[0] > firstPoint[0];

  const initialAngle = Math.atan2(height, width);
  const absoluteAngle = getNormalizedAngle(initialAngle + angle);

  const isUpsideDown = Math.abs(absoluteAngle) > Math.PI / 2;

  if (isLastRight && !isUpsideDown) {
    return {
      x: x + lastPoint[0],
      y: y + lastPoint[1],
    };
  }

  return {
    x: x + firstPoint[0],
    y: y + firstPoint[1],
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

const getLineSizeLabelVector = (
  center: Coordinates2D,
  rightPoint: Coordinates2D,
): Coordinates2D => {
  return {
    x: rightPoint.x - center.x,
    y: rightPoint.y - center.y,
  };
};

const getLineSizeLabelRotatedVector = (
  vector: Coordinates2D,
  angle: number,
) => {
  const { x, y } = vector;

  return {
    x: Math.cos(angle) * x - Math.sin(angle) * y,
    y: Math.sin(angle) * x + Math.cos(angle) * y,
  };
};

const getLineSizeLabelText = (
  width: number,
  gridSize: number,
  gridStep: number,
): string => {
  const metreSize = gridSize * gridStep;
  const sizeInMeters = Math.floor((10 * width) / metreSize) / 10;

  return `${sizeInMeters} м`;
};

const writeLineSizeToCanvas = (
  context: CanvasRenderingContext2D,
  labelText: string,
  labelPosition: { x: number; y: number },
  strokeColor: string,
): void => {
  const { x, y } = labelPosition;

  context.fillStyle = strokeColor;
  context.font = "16px sans-serif";
  context.textAlign = "left";
  context.textBaseline = "top";

  context.fillText(labelText, x, y);
};
