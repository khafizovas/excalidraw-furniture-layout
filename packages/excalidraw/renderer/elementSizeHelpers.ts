import type { ExcalidrawElement } from "../element/types";

export interface Coordinates2D {
  x: number;
  y: number;
}

export const getElementSizeLabelCoord = <ElementType>(
  element: ExcalidrawElement,
  getElementRightPointVector: (
    element: ElementType,
    offset: number,
  ) => Coordinates2D,
  offset: number,
): Coordinates2D => {
  const { angle } = element;

  const center = getElementCenter(element);
  const rightPointVector = getElementRightPointVector(
    element as ElementType,
    offset,
  );

  const vector = getVector(center, rightPointVector);
  const rotatedVector = getRotatedVector(vector, angle);

  return {
    x: center.x + rotatedVector.x,
    y: center.y + rotatedVector.y,
  };
};

export const getElementSizeLabelText = (
  width: number,
  height: number,
  gridSize: number,
  gridStep: number,
  isLinear = false,
): string => {
  if (isLinear) {
    const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const lengthInMeters = getSizeInMeters(length, gridSize, gridStep);

    return `${lengthInMeters}м`;
  }

  const widthInMeters = getSizeInMeters(width, gridSize, gridStep);
  const heightInMeters = getSizeInMeters(height, gridSize, gridStep);

  return `${widthInMeters}м x ${heightInMeters}м`;
};

export const writeElementSizeToCanvas = (
  context: CanvasRenderingContext2D,
  labelText: string,
  labelPosition: { x: number; y: number },
  strokeColor: string,
): void => {
  const { x, y } = labelPosition;

  context.fillStyle = strokeColor;
  context.font = "18px sans-serif";
  context.textAlign = "left";
  context.textBaseline = "top";

  context.shadowColor = "#fff";
  context.shadowBlur = 4;

  context.fillText(labelText, x, y);
  context.shadowBlur = 0;
};

// Private
const getElementCenter = (element: ExcalidrawElement): Coordinates2D => {
  const { x, y, width, height } = element;

  const isLinear = "points" in element;
  if (isLinear) {
    const isRTL = element.points[1][0] < 0;
    const isDTT = element.points[1][1] < 0;

    const coeff = { x: isRTL ? -1 : 1, y: isDTT ? -1 : 1 };

    return {
      x: x + (coeff.x * width) / 2,
      y: y + (coeff.y * height) / 2,
    };
  }

  return {
    x: x + width / 2,
    y: y + height / 2,
  };
};

const getVector = (
  leftPoint: Coordinates2D,
  rightPoint: Coordinates2D,
): Coordinates2D => {
  return {
    x: rightPoint.x - leftPoint.x,
    y: rightPoint.y - leftPoint.y,
  };
};

const getRotatedVector = (
  vector: Coordinates2D,
  angle: number,
): Coordinates2D => {
  const { x, y } = vector;

  return {
    x: Math.cos(angle) * x - Math.sin(angle) * y,
    y: Math.sin(angle) * x + Math.cos(angle) * y,
  };
};

const getSizeInMeters = (
  size: number,
  gridSize: number,
  gridStep: number,
): number => {
  const metreSize = gridSize * gridStep;
  return Math.floor((10 * size) / metreSize) / 10;
};
