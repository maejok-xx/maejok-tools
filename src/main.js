import config from "./modules/config";
import state from "./modules/state";
import { createSettingsButton } from "./modules/settings";
import { getRemotePackageJSON } from "./modules/updater";
import ELEMENTS from "./data/elements";
import {
  startMaejokTools,
  toggleDimMode,
  getUserFromLocalStorage,
  runUserAgreement,
} from "./modules/functions";
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

  const address = window.location.href;

  let isLoaded = false;
  let chat = false;
  let countDownTimer = false;

  const loadingInterval = setInterval(async () => {
    if (address.includes("/chat")) {
      chat = document.querySelector(ELEMENTS.chat.list.selector);
      isLoaded = chat !== null;
      state.set("isPopoutChat", true);
    } else {
      chat = document.querySelector(ELEMENTS.chat.list.selector);
      countDownTimer = document.querySelector(ELEMENTS.countdown.selector);
      isLoaded = chat !== null && countDownTimer !== null;
    }

    if (isLoaded) {
      clearInterval(loadingInterval);

      state.set("loaded", true);

      const user = await getUserFromLocalStorage();
      state.set("user", user);

      createSettingsButton();

      if (!config.get("enablePlugin")) {
        console.warn(`${config.plugin("name")} disabled in settings panel`);
        return;
      }

      startMaejokTools();
    }
  }, 250);
})();
