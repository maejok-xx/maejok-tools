import config from "./modules/config";
import state from "./modules/state";
import { createSettingsButton } from "./modules/settings";
import ELEMENTS from "./data/elements";
import observers from "./modules/observers";
import { ROOMS } from "./modules/constants";
import {
  startMaejokTools,
  toggleDimMode,
  runUserAgreement,
  toggleScanLines,
  getReactProps,
  setUserData,
  getShowLiveStatus,
} from "./modules/functions";
import { checkForUpdate } from "./modules/updater";
import "./styles/styles.scss";

(async function () {
  config.load();

  const userAgreementAccepted = runUserAgreement();

  if (!userAgreementAccepted) {
    return;
  }

  const enableDimMode =
    config.get("enableDimMode") && config.get("enablePlugin");
  toggleDimMode(enableDimMode);

  toggleScanLines(config.get("hideScanLines") && config.get("enablePlugin"));

  const address = window.location.href;
  const userData = config.get("userData");
  if (userData) {
    state.set("user", userData);
  }

  let isLoaded = false;
  let chat,
    updateChecked,
    livestreams,
    directorMode,
    isShowLive = null;
  let hasFetchedShowLiveStatus,
    isPopoutChat = false;

  if (config.get("hideGlobalMissions")) {
    observers.body.start();
  }

  if (
    config.get("hideGlobalMissions") ||
    config.get("enableDragModal") ||
    config.get("enableTTSFilterWarning")
  ) {
    observers.modal.start();
  }

  const loadingInterval = setInterval(async () => {
    if (address.includes("/chat")) {
      chat = document.querySelector(ELEMENTS.chat.list.selector);
      isLoaded = chat !== null;
      isPopoutChat = true;
      state.set("isPopoutChat", true);
    } else {
      chat = document.querySelector(ELEMENTS.chat.list.selector);

      livestreams = document.querySelector(ELEMENTS.livestreams.grid.selector);
      directorMode = document.querySelector(ELEMENTS.header.director.selector);
      isLoaded =
        (directorMode !== null && chat !== null && livestreams !== null) ||
        (directorMode === null && chat !== null);

      const liveStatusFetched =
        state.get("isShowLive") || hasFetchedShowLiveStatus;
      if (!liveStatusFetched) {
        hasFetchedShowLiveStatus = true;
        isShowLive = await getShowLiveStatus();
        state.set("isShowLive", isShowLive);
      }
    }

    if (chat && !updateChecked) {
      updateChecked = true;
      checkForUpdate();
    }

    if (!isLoaded) {
      return;
    }

    const displayNameElement = document.querySelector(
      ELEMENTS.header.user.name.selector
    );

    if (!displayNameElement && !isPopoutChat) {
      return;
    }

    const userId = displayNameElement?.getAttribute("data-user-id") || false;

    if (!userId && !isPopoutChat) {
      return;
    }

    const userFetched = state.get("user")?.displayName;
    if (!userFetched && !isPopoutChat) {
      let userProfile;

      try {
        userProfile = setUserData(displayNameElement);
      } catch (error) {
        clearInterval(loadingInterval);
        return;
      }

      const userData = userProfile?.profile || false;

      if (userData) {
        state.set("user", userData);
        config.set("userData", userData); // Store userData as a fallback for use with popout chat
        config.save();
      }
    } else {
      clearInterval(loadingInterval);

      //weird hacky way to get the methods for changing rooms
      //requires the user to stay on the room grid page until the plugin settings button appears
      if (livestreams) {
        livestreams.querySelectorAll("button").forEach((el) => {
          if (el.id && ROOMS.hasOwnProperty(el.id)) {
            ROOMS[el.id].switchTo = getReactProps(el).onClick;
          }
        });
      }

      state.set("loaded", true);

      createSettingsButton();

      if (!config.get("enablePlugin")) {
        console.warn(`${config.plugin("name")} disabled in settings panel`);
        return;
      }

      startMaejokTools();
    }
  }, 250);
})();
