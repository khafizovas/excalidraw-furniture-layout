import { register } from "./register";
import { cropIcon } from "../components/icons";
import { StoreAction } from "../store";
import { ToolButton } from "../components/ToolButton";
import { isImageElement } from "../element/typeChecks";

export const actionToggleImageResize = register({
  name: "toggleImageResize",
  label: "Непропорциональное масштабирование",
  icon: cropIcon,
  viewMode: true,
  trackEvent: { category: "menu" },
  keywords: ["image", "resize"],
  perform(elements, appState, _, app) {
    return {
      appState: {
        ...appState,
        imageResizeRatio: !appState.imageResizeRatio,
      },
      storeAction: StoreAction.CAPTURE,
    };
  },
  predicate: (elements, appState, _, app) => {
    const selectedElements = app.scene.getSelectedElements(appState);
    return selectedElements.length === 1 && isImageElement(selectedElements[0]);
  },
  PanelComponent: ({ appState, updateData, app }) => {
    const label = "Непропорциональное масштабирование";

    return (
      <ToolButton
        type="button"
        icon={cropIcon}
        title={label}
        aria-label={label}
        onClick={() => updateData(null)}
        selected={appState.imageResizeRatio}
      />
    );
  },
});
