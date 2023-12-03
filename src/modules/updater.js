import { ONE_MINUTE, PACKAGE_URL, VERSION } from "./constants";
import {
  playSound,
  scrollToBottom,
  updateDaysUntilSeasonTwo,
  pluginName,
} from "./functions";
import {
  clickUpdate,
  clickUpdateDismiss,
  clickUpdateChangelog,
} from "./events";
import ELEMENTS from "../data/elements";
import config from "./config";
import state from "./state";

export const start = () => {
  const enabled = config.get("enableUpdateChecks");
  const updateShown = state.get("updateShown");

  if (!enabled || updateShown) {
    stop();
    return;
  }

  const existingInterval = state.get("updateCheckInterval");

  if (existingInterval) {
    stop();
  }

  checkForUpdate().then(() => updateDaysUntilSeasonTwo());

  const timeBetweenChecks = config.get("updateCheckFrequency") * ONE_MINUTE;
  const updateCheckInterval = setInterval(checkForUpdate, timeBetweenChecks);

  state.set("updateCheckInterval", updateCheckInterval);
};

export const stop = () => {
  const existingInterval = state.get("updateCheckInterval");

  if (!existingInterval) {
    return;
  }

  clearInterval(existingInterval);
  state.set("updateCheckInterval", null);
};

export const checkForUpdate = async () => {
  const packageJSON = await getRemotePackageJSON();

  if (!packageJSON) {
    return;
  }

  const updateData = {
    currentVersion: VERSION,
    newVersion: packageJSON.version,
  };

  const udpateAvailable = isRemoteVersionNewer(
    updateData.currentVersion,
    updateData.newVersion
  );

  if (udpateAvailable) {
    stop();
    playSound("mention");
    insertChatUpdateMessage(updateData);
    state.set("updateShown", true);
  }
};

export const getRemotePackageJSON = async () => {
  const cacheBuster = new Date().getTime();
  const url = `${PACKAGE_URL}?cb=${cacheBuster}`;
  const now = new Date().getTime();

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error fetching remote package data! Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      state.set("packageJson", { lastCheckedAt: now, ...data });
      return data;
    })
    .catch((error) => {
      console.error(`Get remote package fetch error:`, error);
      return false;
    });
};

export const insertChatUpdatedMessage = () => {
  const showUpdateNotice = config.get("showUpdateNotice");

  if (!showUpdateNotice) {
    console.log("no show");
    return;
  }
  console.log("show");

  config.set("showUpdateNotice", false);
  config.save();

  const chat = document.querySelector(ELEMENTS.chat.list.selector);

  const wrapper = document.createElement("div");
  wrapper.id = "maejok-update-message";

  const body = document.createElement("div");
  body.className = "maejok-update-body";

  const title = document.createElement("div");
  title.className = "maejok-update-title";
  title.innerHTML = `${pluginName().toUpperCase()}`;

  const clickHere = document.createElement("div");
  clickHere.className = "maejok-updated-notice";
  clickHere.innerHTML = ` v${VERSION} Successfully Installed!`;

  const links = document.createElement("div");
  links.className = "maejok-update-links";

  const changeLog = document.createElement("a");
  changeLog.className = "maejok-update-changelog";
  changeLog.textContent = "changelog";

  const dismiss = document.createElement("a");
  dismiss.className = "maejok-update-dismiss";
  dismiss.textContent = "dismiss";

  links.appendChild(document.createTextNode("[  "));
  links.appendChild(changeLog);
  links.appendChild(document.createTextNode("  |  "));
  links.appendChild(dismiss);
  links.appendChild(document.createTextNode("  ]"));

  body.appendChild(title);
  body.appendChild(clickHere);
  body.appendChild(links);

  wrapper.appendChild(body);

  chat.appendChild(wrapper);

  changeLog.addEventListener("click", clickUpdateChangelog);
  dismiss.addEventListener("click", clickUpdateDismiss);

  scrollToBottom();
};

function insertChatUpdateMessage(updateData) {
  const chat = document.querySelector(ELEMENTS.chat.list.selector);

  const wrapper = document.createElement("div");
  wrapper.id = "maejok-update-message";

  const body = document.createElement("div");
  body.className = "maejok-update-body";

  const title = document.createElement("div");
  title.className = "maejok-update-title";
  title.innerHTML = `${pluginName().toUpperCase()} v${
    updateData.currentVersion
  }`;

  const clickHere = document.createElement("div");
  clickHere.className = "maejok-update-click_here";
  clickHere.innerHTML = `Update to <strong>v${updateData.newVersion}</strong>!`;

  const links = document.createElement("div");
  links.className = "maejok-update-links";

  const changeLog = document.createElement("a");
  changeLog.className = "maejok-update-changelog";
  changeLog.textContent = "changelog";

  const dismiss = document.createElement("a");
  dismiss.className = "maejok-update-dismiss";
  dismiss.textContent = "dismiss";

  links.appendChild(document.createTextNode("[  "));
  links.appendChild(changeLog);
  links.appendChild(document.createTextNode("  |  "));
  links.appendChild(dismiss);
  links.appendChild(document.createTextNode("  ]"));

  body.appendChild(title);
  body.appendChild(clickHere);
  body.appendChild(links);

  wrapper.appendChild(body);

  chat.appendChild(wrapper);

  clickHere.addEventListener("click", clickUpdate);
  changeLog.addEventListener("click", clickUpdateChangelog);
  dismiss.addEventListener("click", clickUpdateDismiss);

  scrollToBottom();
}

function isRemoteVersionNewer(localVersion, remoteVersion) {
  const parseVersion = (str) => str.split(".").map(Number);

  const [major1, minor1, patch1] = parseVersion(remoteVersion);
  const [major2, minor2, patch2] = parseVersion(localVersion);

  if (major1 > major2) {
    return true;
  } else if (major1 < major2) {
    return false;
  }

  if (minor1 > minor2) {
    return true;
  } else if (minor1 < minor2) {
    return false;
  }

  if (patch1 > patch2) {
    return true;
  } else if (patch1 < patch2) {
    return false;
  }

  return false;
}
