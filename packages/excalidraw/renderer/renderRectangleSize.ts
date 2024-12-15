import type {
  ExcalidrawEllipseElement,
  ExcalidrawRectangleElement,
} from "../element/types";
import type { InteractiveCanvasAppState } from "../types";

interface Coordinates2D {
  x: number;
  y: number;
}

type SelectedRectangleElement =
  | ExcalidrawRectangleElement
  | ExcalidrawEllipseElement;

export const renderSelectedRectangleSize = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  rectangle: SelectedRectangleElement,
): void => {
  const { gridStep = 0, gridSize = 0 } = appState;
  const { strokeColor } = rectangle;

  const labelPosition = getRectangleSizeLabelCoord(rectangle, gridSize);
  const labelText = getRectangleSizeLabel(rectangle, gridSize, gridStep);

  writeRectangleSizeToCanvas(context, labelText, labelPosition, strokeColor);
};

const getRectangleSizeLabelCoord = (
  rectangle: SelectedRectangleElement,
  offset: number,
): Coordinates2D => {
  const center = getRectangleCenter(rectangle);
  const corner = getRectangleSizeLabelCorner(rectangle, offset);

  const vector = getRectangleSizeLabelVector(center, corner);
  const rotatedVector = getRotatedRectangleSizeLabelVector(
    vector,
    rectangle.angle,
  );

  return {
    x: center.x + rotatedVector.x,
    y: center.y + rotatedVector.y,
  };
};

const getRectangleCenter = (
  rectangle: SelectedRectangleElement,
): Coordinates2D => {
  const { x, y, width, height } = rectangle;

  return {
    x: x + width / 2,
    y: y + height / 2,
  };
};

const getRectangleSizeLabelCorner = (
  rectangle: SelectedRectangleElement,
  offset: number,
): Coordinates2D => {
  const { x, y, width, height, angle } = rectangle;

  if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
    return { x: x - offset, y: y - offset };
  }

  if (angle >= (3 * Math.PI) / 4 && angle < (5 * Math.PI) / 4) {
    return { x: x - offset, y: y + height + offset };
  }

  if (angle >= (5 * Math.PI) / 4 && angle < (7 * Math.PI) / 4) {
    return { x: x + width + offset, y: y + height + offset };
  }

  return { x: x + width + offset, y: y - offset };
};

const getRectangleSizeLabelVector = (
  center: Coordinates2D,
  corner: Coordinates2D,
): Coordinates2D => {
  const { x: centerX, y: centerY } = center;
  const { x: cornerX, y: cornerY } = corner;

  return {
    x: cornerX - centerX,
    y: cornerY - centerY,
  };
};

const getRotatedRectangleSizeLabelVector = (
  vector: Coordinates2D,
  angle: number,
): Coordinates2D => {
  const { x, y } = vector;

  return {
    x: Math.cos(angle) * x - Math.sin(angle) * y,
    y: Math.sin(angle) * x + Math.cos(angle) * y,
  };
};

const getRectangleSizeLabel = (
  rectangle: SelectedRectangleElement,
  gridSize: number,
  gridStep: number,
): string => {
  const { width, height, angle } = rectangle;

  const isUpsideDown =
    (angle > Math.PI / 4 && angle < (3 * Math.PI) / 4) ||
    (angle > (5 * Math.PI) / 4 && angle < (7 * Math.PI) / 4);

  const rotatedWidth = isUpsideDown ? height : width;
  const rotatedHeight = isUpsideDown ? width : height;

  const metreSize = gridSize * gridStep;

  const widthInMeters = Math.floor((10 * rotatedWidth) / metreSize) / 10;
  const heightInMeters = Math.floor((10 * rotatedHeight) / metreSize) / 10;

  const widthStr = `${widthInMeters}м`;
  const heightStr = `${heightInMeters}м`;

  return `${widthStr} x ${heightStr}`;
};

const writeRectangleSizeToCanvas = (
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
