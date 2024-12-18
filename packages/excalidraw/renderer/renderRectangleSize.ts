import type {
  ExcalidrawEllipseElement,
  ExcalidrawImageElement,
  ExcalidrawRectangleElement,
} from "../element/types";
import type { InteractiveCanvasAppState } from "../types";
import type { Coordinates2D } from "./elementSizeHelpers";
import {
  getElementSizeLabelCoord,
  getElementSizeLabelText,
  writeElementSizeToCanvas,
} from "./elementSizeHelpers";

export interface GroupSelectionRectangle {
  type: "group";
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  strokeColor: string;
}

type SelectedRectangleElement =
  | ExcalidrawRectangleElement
  | ExcalidrawEllipseElement
  | ExcalidrawImageElement;

export const renderSelectedRectangleSize = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  rectangle: SelectedRectangleElement | GroupSelectionRectangle,
): void => {
  const { gridStep = 0, gridSize = 0 } = appState;

  const strokeColor =
    rectangle.type === "image" ? "#000" : rectangle.strokeColor;

  let labelPosition;
  let labelText;

  if (rectangle.type !== "group") {
    labelPosition = getElementSizeLabelCoord(
      rectangle,
      getRectangleSizeLabelCorner,
      gridSize,
    );
    labelText = getRectangleSizeLabelText(rectangle, gridSize, gridStep);
  } else {
    labelPosition = getGroupRectangleSizeLabelCoord(rectangle, gridSize);
    labelText = getElementSizeLabelText(
      rectangle.x2 - rectangle.x1,
      rectangle.y2 - rectangle.y1,
      gridSize,
      gridStep,
    );
  }

  writeElementSizeToCanvas(context, labelText, labelPosition, strokeColor);
};

const getGroupRectangleSizeLabelCoord = (
  rectangle: GroupSelectionRectangle,
  offset: number,
): Coordinates2D => {
  return {
    x: rectangle.x2 - 4 * offset,
    y: rectangle.y1 - offset,
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

const getRectangleSizeLabelText = (
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

  const sizeLabelText = getElementSizeLabelText(
    rotatedWidth,
    rotatedHeight,
    gridSize,
    gridStep,
  );

  return sizeLabelText;
};
