import clsx from "clsx";
import { Button } from "./Button";
import "./RoomPlanButton.scss";

export default function RoomPlanButton() {
  // TODO: Проверка условия отображения
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
