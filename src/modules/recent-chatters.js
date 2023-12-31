import config from "./config";
import state from "./state";
import ELEMENTS from "../data/elements";

export const start = () => {
  const existingInterval = state.get("recentChattersInterval");
  const chatCount = document.querySelector(
    ELEMENTS.chat.header.recent.selector
  );

  if (existingInterval || chatCount) {
    stop();
  }

  create();
  update();

  const recentChattersInterval = setInterval(() => {
    if (config.get("enableRecentChatters")) {
      update();
    }
  }, 15 * 1000);

  state.set("recentChattersInterval", recentChattersInterval);
};

export const stop = () => {
  const existingInterval = state.get("recentChattersInterval");
  if (!existingInterval) {
    return;
  }

  const chatCount = document.querySelector(
    ELEMENTS.chat.header.recent.selector
  );

  chatCount?.remove();

  state.set("recentChatters", []);

  clearInterval(existingInterval);
  state.set("recentChattersInterval", null);
};

export const update = (user) => {
  if (!config.get("enableRecentChatters")) {
    return;
  }

  const currentTime = Date.now();
  const recentChatters = state.get("recentChatters");
  const threshold = Number(config.get("recentChattersThreshold"));

  let updatedChatters;
  if (threshold !== 0) {
    const thresholdTime = threshold * 60 * 1000;
    updatedChatters = recentChatters.filter(
      (obj) => currentTime <= obj.lastSeen + thresholdTime
    );
  } else {
    updatedChatters = recentChatters;
  }

  if (user) {
    const existingUserIndex = recentChatters.findIndex(
      (obj) => obj.id === user.id
    );

    if (existingUserIndex !== -1) {
      recentChatters[existingUserIndex].lastSeen = currentTime;
    } else {
      updatedChatters = [
        ...updatedChatters,
        { ...user, lastSeen: currentTime },
      ];
    }
  }

  const sortedChatters = updatedChatters.sort(
    (a, b) => b.lastSeen - a.lastSeen
  );

  const sortFish = (a, b) => {
    if (a.fish && !b.fish) {
      return -1;
    } else if (!a.fish && b.fish) {
      return 1;
    } else {
      return b.lastSeen - a.lastSeen;
    }
  };

  const sortedWithFish = sortedChatters.sort(sortFish);

  const sortStaff = (a, b) => {
    if (a.staff && !b.staff) {
      return -1;
    } else if (!a.staff && b.staff) {
      return 1;
    } else {
      return b.lastSeen - a.lastSeen;
    }
  };

  const completeSorted = sortedWithFish.sort(sortStaff);

  state.set("recentChatters", completeSorted);

  refresh();
};

function refresh() {
  if (!config.get("enableRecentChatters")) {
    return;
  }

  const users = state.get("recentChatters");

  const chatCount = document.querySelector(
    ELEMENTS.chat.header.recent.count.selector
  );

  if (!chatCount) {
    return;
  }

  const numberString = String(users.length);
  const zerosToAdd = 5 - numberString.length;
  const zeroPadding = "0".repeat(zerosToAdd);

  chatCount.innerText = zeroPadding + numberString;
}

function create() {
  if (!config.get("enableRecentChatters")) {
    return;
  }

  const chatHeader = document.querySelector(
    ELEMENTS.chat.header.presence.selector
  );
  const chatPresence = document.createElement("div");
  chatPresence.classList.add(ELEMENTS.chat.header.presence.class);
  chatPresence.classList.add(ELEMENTS.chat.header.recent.class);

  const chattersText = document.createElement("div");
  chattersText.innerText = `Chatting`;

  const chattersCount = document.createElement("div");
  chattersCount.classList.add(ELEMENTS.chat.header.presence.count.class);
  chattersCount.classList.add(ELEMENTS.chat.header.recent.count.class);
  chattersCount.innerHTML = `00000`;

  chatHeader.insertAdjacentElement("afterend", chatPresence);
  chatPresence.appendChild(chattersCount);
  chatPresence.appendChild(chattersText);

  update();
}
