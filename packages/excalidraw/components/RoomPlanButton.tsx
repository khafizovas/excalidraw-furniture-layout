import clsx from "clsx";
import { ROOM_PLAN_IMAGE_URL_KEY } from "../constants";
import { Button } from "./Button";
import "./RoomPlanButton.scss";

declare global {
  interface Window {
    [ROOM_PLAN_IMAGE_URL_KEY]?: string;
  }
}

interface RoomPlanButtonProps {
  onClick?: (params: OnClickParams) => Promise<void>;
}

interface OnClickParams {
  insertOnCanvasDirectly: boolean;
  imageUrl?: string;
}

export const RoomPlanButton = (props: RoomPlanButtonProps) => {
  const { onClick } = props;

  const roomPlanImageUrl = window[ROOM_PLAN_IMAGE_URL_KEY];
  if (!roomPlanImageUrl || !onClick) {
    return null;
  }

  const handleSelect = () => {
    onClick({ insertOnCanvasDirectly: true, imageUrl: roomPlanImageUrl });
  };

  return (
    <Button
      onSelect={handleSelect}
      className={clsx("collab-button", "room-plan-button")}
    >
      План помещения
    </Button>
  );
};
