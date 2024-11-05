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
  getUserData,
} from "./modules/functions";
import { checkForUpdate } from "./modules/updater";
import "./styles/styles.scss";

(async function () {
  if (localStorage.getItem('maej3rked-installed') !== null) {
    alert('You are now using maej3rked-tools.  Please uninstall maejok-tools from your userscript extension (Tampermonkey, GreaseMonkey, etc), as it is no longer needed.');
    return;
  } else {
    const depreciationNotice = () => {
      const depreciationPrompt = prompt('MAEJOK-TOOLS DEPRECIATION NOTICE!!\n\nPLEASE READ THIS CAREFULLY!!\n\nThis update does not contain any new features or bug fixes.  I (maejok) have discontinued updates for this plugin. The new maintainer of this plugin is "f3rked".  He will take over maintenance and updates. \n\nThe new source can be found here: https://github.com/f3rked/maej3rked-tools \n\n I trust f3rked with this project and I\m happy to see it making progress without  me, but I will not be able to provide support for it.  If you have any issues with the plugin, please report them to f3rked.\n\nIf you wish to continue using and receiving updates for this plugin, you can install f3rked\'s fork of maejok-tools, now called "maej3rked-tools".  Just type "f3rked" below to get started with f3rked\'s plugin, or go to https://greasyfork.org/en/scripts/501824-maej3rked-tools-for-fishtank-live\n\nThanks for your support!\n\n-maejok');

      if (depreciationPrompt.toLowerCase() === "f3rked") {
        GM_openInTab('https://greasyfork.org/en/scripts/501824-maej3rked-tools-for-fishtank-live', { active: true });
        return;
      }

      depreciationNotice();
    };

    depreciationNotice();
  }

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
  let hasFetchedUserData = false;
  let isPopoutChat = false;

  if (config.get("hideGlobalMissions")) {
    observers.body.start();
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
      isShowLive = directorMode !== null;
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

    const userFetched = state.get("user") || hasFetchedUserData;
    if (!userFetched && !isPopoutChat) {
      hasFetchedUserData = true;
      let userProfile;

      try {
        userProfile = await getUserData(userId);
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
