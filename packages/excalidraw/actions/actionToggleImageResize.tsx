import { register } from "./register";
import { cropIcon } from "../components/icons";
import { StoreAction } from "../store";
import { ToolButton } from "../components/ToolButton";
import { isScalingTypeTogglableElement } from "../element/typeChecks";
import { t } from "../i18n";

export const actionToggleImageResize = register({
  name: "toggleImageResize",
  label: "helpDialog.imageResizeRatio",
  icon: cropIcon,
  viewMode: true,
  trackEvent: { category: "menu" },
  keywords: ["resize"],
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
    return (
      selectedElements.length === 1 &&
      isScalingTypeTogglableElement(selectedElements[0])
    );
  },
  PanelComponent: ({ appState, updateData, app }) => {
    const label = t("helpDialog.imageResizeRatio");

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
