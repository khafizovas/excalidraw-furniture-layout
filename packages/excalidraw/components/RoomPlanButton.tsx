import clsx from "clsx";
import { Button } from "./Button";
import "./RoomPlanButton.scss";

export default function RoomPlanButton() {
  return (
    <Button
      onSelect={() => {
        // TODO: Поведение при нажатии
      }}
      className={clsx("collab-button", "room-plan-button")}
    >
      План помещения
    </Button>
  );
}
