import { ONE_MINUTE } from "./constants";
import { playSound, scrollToBottom } from "./functions";
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

  checkForUpdate();

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
  state.set("remoteData", null);
};

export const checkForUpdate = async () => {
  const now = new Date().getTime();
  const cachedRemoteData = state.get("remoteData");
  const updateCheckFrequency = config.get("updateCheckFrequency");

  const remoteDataExpired =
    !cachedRemoteData?.lastCheckedAt ||
    cachedRemoteData?.lastCheckedAt + updateCheckFrequency <= now;

  const remoteData = !remoteDataExpired
    ? cachedRemoteData
    : await getRemoteData();
  state.set("remoteData", { lastCheckedAt: now, ...remoteData });

  const updateData = {
    currentVersion: GM_info.script.version,
    newVersion: remoteData.version,
  };

  const udpateAvailable = isRemoteVersionNewer(
    updateData.currentVersion,
    updateData.newVersion
  );

  if (udpateAvailable) {
    stop();
    playSound("mention");
    insertChatMessage(updateData);
    state.set("updateShown", true);
  }
};

function insertChatMessage(updateData) {
  const chat = document.querySelector(ELEMENTS.chat.list.selector);

  const wrapper = document.createElement("div");
  wrapper.id = "maejok-update-message";

  const body = document.createElement("div");
  body.className = "maejok-update-body";

  const title = document.createElement("div");
  title.className = "maejok-update-title";
  title.innerHTML = `${config.plugin("name")} v${updateData.currentVersion}`;

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

  // Compare major versions
  if (major1 > major2) {
    return true;
  } else if (major1 < major2) {
    return false;
  }

  // Major versions are equal, compare minor versions
  if (minor1 > minor2) {
    return true;
  } else if (minor1 < minor2) {
    return false;
  }

  // Minor versions are equal, compare patch versions
  if (patch1 > patch2) {
    return true;
  } else if (patch1 < patch2) {
    return false;
  }

  // Versions are equal
  return false;
}

async function getRemoteData() {
  const repoRoot = config.plugin("repoRoot");
  const cacheBuster = new Date().getTime();

  const url = `${repoRoot}/test1.json?cb=${cacheBuster}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error fetching Remote Configuration data! Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      state.set("remoteData", data);
      return data;
    })
    .catch((error) => {
      console.error("Get remote config fetch error:", error);
      return false;
    });
}
