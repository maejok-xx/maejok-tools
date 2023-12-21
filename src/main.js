import config from "./modules/config";
import state from "./modules/state";
import { createSettingsButton } from "./modules/settings";
import { getRemotePackageJSON } from "./modules/updater";
import ELEMENTS from "./data/elements";
import observers from "./modules/observers";
import {
  startMaejokTools,
  toggleDimMode,
  getUserFromLocalStorage,
  getClanFromLocalStorage,
  runUserAgreement,
  toggleScanLines,
} from "./modules/functions";
import { insertChatUpdatedMessage as showUpdateNotice } from "./modules/updater";
import "./styles/styles.scss";

(function () {
  config.load();

  const userAgreementAccepted = runUserAgreement();

  if (!userAgreementAccepted) {
    return;
  }

  getRemotePackageJSON();

  const enableDimMode =
    config.get("enableDimMode") && config.get("enablePlugin");
  toggleDimMode(enableDimMode);

  toggleScanLines(config.get("hideScanLines") && config.get("enablePlugin"));

  const address = window.location.href;

  let isLoaded = false;
  let chat = false;
  let livestreams = false;

  if (config.get("hideGlobalMissions")) {
    observers.body.start();
    observers.modal.start();
  }

  const loadingInterval = setInterval(async () => {
    if (address.includes("/chat")) {
      chat = document.querySelector(ELEMENTS.chat.list.selector);
      isLoaded = chat !== null;
      state.set("isPopoutChat", true);
    } else {
      chat = document.querySelector(ELEMENTS.chat.list.selector);
      livestreams = document.querySelector(ELEMENTS.livestreams.selector);
      isLoaded = chat !== null && livestreams !== null;
    }

    if (isLoaded) {
      clearInterval(loadingInterval);

      state.set("loaded", true);

      const user = await getUserFromLocalStorage();
      const clan = await getClanFromLocalStorage();
      state.set("user", user);
      state.set("clan", clan);

      createSettingsButton();

      if (!config.get("enablePlugin")) {
        console.warn(`${config.plugin("name")} disabled in settings panel`);
        return;
      }

      showUpdateNotice();
      startMaejokTools();
    }
  }, 250);
})();
