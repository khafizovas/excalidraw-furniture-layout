import "./ToolIcon.scss";

import clsx from "clsx";
import type { ToolButtonSize } from "./ToolButton";
import { LockedIcon } from "./icons";

type LockIconProps = {
  title?: string;
  name?: string;
  isMobile?: boolean;
};

const DEFAULT_SIZE: ToolButtonSize = "medium";

export const LockButton = (props: LockIconProps) => {
  return (
    <label
      className={clsx(
        "ToolIcon ToolIcon__lock",
        `ToolIcon_size_${DEFAULT_SIZE}`,
        {
          "is-mobile": props.isMobile,
        },
      )}
      title={`${props.title} — Q`}
    >
      <input
        className="ToolIcon_type_checkbox"
        type="checkbox"
        name={props.name}
        checked
        readOnly
        aria-label={props.title}
        data-testid="toolbar-lock"
      />
      <div className="ToolIcon__icon">{LockedIcon}</div>
    </label>
  );
};
