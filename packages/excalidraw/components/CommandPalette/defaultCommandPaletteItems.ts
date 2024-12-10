import { actionToggleTheme } from "../../actions";
// TODO: Не подхватывает текущую локаль, достаёт перевод из en.json
// import { t } from "../../i18n";
import type { CommandPaletteItem } from "./types";

export const toggleTheme: CommandPaletteItem = {
  ...actionToggleTheme,
  category: "Приложение", // t("commandPalette.categories.app"),
  label: "Переключить тему", // t("labels.toggleTheme"),
  perform: ({ actionManager }) => {
    actionManager.executeAction(actionToggleTheme, "commandPalette");
  },
};
