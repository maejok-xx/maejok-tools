import config from "./config";
import state from "./state";
import {
  VERSION,
  SOUNDS,
  DARK_MODE_STYLES,
  SCREEN_TAKEOVERS_STYLES,
  BIG_SCREEN_STYLES,
  DEFAULT_KEYBINDS,
} from "./constants";
import Message from "../classes/Message";
import ELEMENTS from "../data/elements";
import { rightClick, leftClick, dblClick, keyPress } from "./events";
import { start as startUpdater, stop as stopUpdater } from "./updater";
import { applySettingsToChat } from "./settings";
import {
  start as startRecentChatters,
  stop as stopRecentChatters,
  update as updateRecentChatters,
} from "./recent-chatters";
import observers from "./observers";

export const getReactProps = (element) => {
  if (!element) return null;
  return element[
    Object.getOwnPropertyNames(element).filter((prop) => {
      return prop.startsWith("__reactProps");
    })
  ];
};

export const inputIsFocused = () => {
  return (
    document.activeElement.className.toLowerCase().includes("input") ||
    document.activeElement.role?.toLowerCase() == "input" ||
    document.activeElement.tagName.toLowerCase() == "input"
  );
};

export const existsInUserList = (list, userId) => {
  const users = config.get(list);
  if (!users.length) return false;
  return users.some((user) => user.id === userId);
};

export const modifyUserList = (list, user, toggle) => {
  const users = config.get(list);
  let newUsers = false;
  let userExists = false;

  if (users.length) {
    userExists = users.some((listUser) => listUser.id === user.id);
  }

  if (toggle) {
    if (!userExists) {
      // Add
      newUsers = [
        ...users,
        {
          id: user.id,
          displayName: user.displayName,
          color: user.color,
        },
      ];
      toast(`${user.displayName} added to ${list} list`, "success");
    } else {
      toast(`${user.displayName} is already in ${list} list`, "error");
      return false;
    }
  } else {
    if (userExists) {
      // Remove
      newUsers = users.filter((listUser) => listUser.id !== user.id);
      toast(`${user.displayName} removed from ${list} list`, "success");
    } else {
      toast(`${user.displayName} is not in ${list} list`, "error");
      return false;
    }
  }

  if (!newUsers) {
    toast(`${user.displayName} could not be added to ${list} list`, "error");
    return false;
  }

  config.set(list, newUsers);
  config.save();
  applySettingsToChat();
  return true;
};

export const toggleItemInList = (list, item) => {
  const items = config.get(list);
  const itemExists = items.includes(item);

  if (itemExists) {
    const index = items.indexOf(item);
    items.splice(index, 1);
  } else {
    items.push(item);
  }

  config.set(list, items);
  config.save();

  return itemExists ? false : true;
};

export const capitalize = (str) => {
  return str.replace(/^\w/, (c) => c.toUpperCase());
};

export const getElementText = (element, childSelector = false) => {
  let text = false;

  if (typeof element === "string") {
    element = document.querySelector(element);
  }

  if (!element) {
    return false;
  }

  element = childSelector ? element.querySelector(childSelector) : element;

  if (typeof element.textContent !== undefined) {
    text = element.textContent;
  } else if (typeof element.innerText !== undefined) {
    text = element.innerText;
  } else if (typeof element.innerHTML !== undefined) {
    text = element.innerHTML;
  }
  return text ? text : false;
};

export const toggleDenseChat = () => {
  const chatInner = document.querySelector(ELEMENTS.chat.list.selector);

  chatInner.classList.toggle(
    "maejok-dense-chat",
    config.get("enableDenseChat")
  );
};

export const toggleScanLines = (toggle) => {
  const body = document.querySelector("body");

  toggle = toggle === undefined ? config.get("hideScanLines") : toggle;

  body.classList.toggle("maejok-hide-scan_lines", toggle);
};

export const toggleBigScreen = (mode = null, muted = false) => {
  if (config.get("enableBigScreen")) {
    if (!muted) {
      playSound("shutter");
    }

    mode = mode === null ? !state.get("bigScreenState") : mode;
  } else {
    mode = false;
  }

  if (config.get("persistBigScreen")) {
    config.set("bigScreenState", mode);
    config.save();
  }

  state.set("bigScreenState", mode);

  if (mode) {
    const style = document.createElement("style");
    style.textContent = BIG_SCREEN_STYLES;
    style.setAttribute("id", "maejok-bigscreen");
    document.head.appendChild(style);
  } else {
    const styles = document.getElementById("maejok-bigscreen");
    styles?.remove();
  }
};

export const toggleDimMode = (toggle) => {
  if (toggle) {
    const style = document.createElement("style");
    style.textContent = DARK_MODE_STYLES;
    style.setAttribute("id", "maejok-darkmode");
    document.head.appendChild(style);
  } else {
    const styles = document.getElementById("maejok-darkmode");
    styles?.remove();
  }
};

export const toggleScreenTakeovers = (toggle) => {
  if (toggle) {
    const style = document.createElement("style");
    style.textContent = SCREEN_TAKEOVERS_STYLES;
    style.setAttribute("id", "maejok-hidescreentakeovers");
    document.head.appendChild(style);
  } else {
    const styles = document.getElementById("maejok-hidescreentakeovers");
    styles?.remove();
  }
};

export const mentionUser = (displayName) => {
  const input = document.querySelector(ELEMENTS.chat.input.selector);
  if (typeof displayName === "object") displayName = displayName.displayName;

  const mention = new CustomEvent("insertmention", {
    detail: `${displayName}`,
  });

  playSound("click-high-short");

  document.dispatchEvent(mention);

  input && setCursorPosition(input);
};

export const getMessageType = (element) => {
  const classes = {
    message: ELEMENTS.chat.message.class,
    emote: ELEMENTS.chat.emote.class,
    clan: ELEMENTS.chat.clan.class,
    system: ELEMENTS.chat.system.class,
    consumable: ELEMENTS.chat.consumable.class,
    tts: ELEMENTS.chat.tts.class,
    sfx: ELEMENTS.chat.sfx.class,
  };

  const conditions = new Map([
    [
      "message",
      hasClass(element, classes.message) ||
        closestWithClass(element, classes.message),
    ],
    [
      "emote",
      hasClass(element, classes.emote) ||
        closestWithClass(element, classes.emote),
    ],
    [
      "roll",
      element.textContent.includes("rolls a 20-sided dice") &&
        (hasClass(element, classes.emote) ||
          closestWithClass(element, classes.emote)),
    ],
    [
      "clan",
      hasClass(element, classes.clan) ||
        closestWithClass(element, classes.clan),
    ],
    [
      "system",
      hasClass(element, classes.system) ||
        closestWithClass(element, classes.system),
    ],
    [
      "consumable",
      hasClass(element, classes.consumable) ||
        closestWithClass(element, classes.consumable),
    ],
    [
      "tts",
      hasClass(element, classes.tts) || closestWithClass(element, classes.tts),
    ],
    [
      "sfx",
      hasClass(element, classes.sfx) || closestWithClass(element, classes.sfx),
    ],
  ]);

  let result = null;

  conditions.forEach((condition, type) => {
    if (condition) {
      result = type;
    }
  });

  return result;
};

export const getUserFromChat = (element) => {
  const messageType = getMessageType(element);
  if (!element) {
    return;
  }

  const validMessageTypes = ["message", "emote", "roll"];
  if (!validMessageTypes.includes(messageType)) {
    return;
  }

  const selector = ELEMENTS.chat[messageType];

  const messageElement = closestWithClass(element, selector.class);

  const senderElement = messageElement.querySelector(selector.sender.selector);

  if (!senderElement || !messageElement) {
    return;
  }

  const displayName = getSender(senderElement, messageType);
  const displayNameColor = senderElement.style.color || "rgb(255, 255, 255)";

  const id = messageElement.hasAttribute("data-user-id")
    ? messageElement.getAttribute("data-user-id")
    : null;

  const user = { displayName, id, color: displayNameColor };
  return user;
};

export const getSender = function (messageElement, messageType) {
  const sender = ELEMENTS.chat[messageType].sender;

  const senderElement = messageElement.classList.contains(sender.class)
    ? messageElement
    : messageElement.querySelector(sender.selector);

  const senderText = messageType === "message"
    ? senderElement.lastChild.textContent
    : getElementText(senderElement);

  return senderText;
}


export const getUserData = async (userId) => {
  const data = await fetchFromFishtank(
    "get",
    `https://www.fishtank.live/api/user/get?uid=${userId}`
  );

  return data || false;
};

export const findUserByName = (displayName) => {
  const messages = document.querySelectorAll(ELEMENTS.chat.message.selector);
  const messagesArray = Array.from(messages);

  let user = false;
  messagesArray.some((node) => {
    const message = new Message(node);
    const sender = message.sender;
    const messageType = message.type;
    message.destroy();

    if (messageType !== "message") {
      return false;
    }

    if (sender.displayName === displayName) {
      user = sender;
      return true;
    }
  });

  return user;
};

export const findNearestRelative = (element, className) => {
  let currentElement = element;

  if (!currentElement) {
    return;
  }

  if (currentElement.classList?.contains(className)) {
    return currentElement;
  }

  if (currentElement.parentElement.classList.contains(className)) {
    return currentElement.parentElement;
  }
  // Check siblings
  while (
    currentElement.nextElementSibling ||
    currentElement.previousElementSibling
  ) {
    if (
      currentElement.nextElementSibling &&
      currentElement.nextElementSibling.classList.contains(className)
    ) {
      return currentElement.nextElementSibling;
    }

    if (
      currentElement.previousElementSibling &&
      currentElement.previousElementSibling.classList.contains(className)
    ) {
      return currentElement.previousElementSibling;
    }

    currentElement = currentElement.parentElement; // Move up to the parent
  }

  // Check children
  const childElements = Array.from(element.children);
  for (const child of childElements) {
    if (child.classList.contains(className)) {
      return child;
    }
  }

  return null; // No matching relative element found
};

export const setChatInputValue = (value, replace = true) => {
  const input = document.querySelector(ELEMENTS.chat.input.selector);
  if (!replace)
    value = input.innerHTML
      ? `${input.innerHTML} ${value}&nbsp;`
      : `${value}&nbsp;`;
  input.innerHTML = value;
  input.dispatchEvent(new KeyboardEvent("input", { bubbles: true }));
  setCursorPosition(input);
};

export const scrollToBottom = () => {
  const chat = document.querySelector(ELEMENTS.chat.list.selector);
  chat.scrollTop = chat.scrollHeight;
};

export const processChatMessage = (node, logMentions = true) => {
  const cfg = config.get();
  const message = new Message(node);

  if (logMentions) {
    processMentions(message);
  }

  checkRoomChange(node);

  const msgHideTypes = {
    emote: "hideEmotes",
    system: "hideSystem",
    clan: "hideClanMessages",
    consumable: "hideConsumables",
    roll: "hideDiceRolling",
    tts: "hideTTSMessages",
    sfx: "hideSFXMessages",
  };

  if (cfg[msgHideTypes[message.type]] && cfg.enablePlugin) {
    message.hide();
  } else {
    message.show();

    const messageHideMap = {
      hideTimestamps: {
        element: "timestamp",
        hide: cfg.enablePlugin ? cfg.hideTimestamps : false,
      },
      hideClans: {
        element: "clan",
        hide: cfg.enablePlugin ? cfg.hideClans : false,
      },
      hideAvatars: {
        element: "avatar",
        hide: cfg.enablePlugin ? cfg.hideAvatars : false,
      },
      hideLevels: {
        element: "level",
        hide: cfg.enablePlugin ? cfg.hideLevels : false,
      },
      hideEndorsements: {
        element: "endorsement",
        hide: cfg.enablePlugin ? cfg.hideEndorsements : false,
      },
    };

    const hideTypes = Object.entries(messageHideMap).reduce(
      (acc, [, data]) => {
        acc.element.push(data.element);
        acc.hide.push(data.hide);
        return acc;
      },
      { element: [], hide: [] }
    );

    message.normalizeEpic();
    message.normalizeGrand();

    message.fixDarkDisplayName();

    message.hideElements(hideTypes.element, hideTypes.hide);

    message.highlightMessage();

    updateRecentChatters(message.sender);
  }

  message.destroy();
};

export const getMinutesAgo = (timestamp) => {
  const minutes = Math.round((Date.now() - timestamp) / (1000 * 60));
  if (minutes < 1) {
    return "less than a minute ago";
  } else {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
};

export const uuid = () => {
  const array = new Uint16Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, (num) => num.toString(16)).join("");
};

export const getHighestZIndex = () => {
  let maxZIndex = 0;
  const elements = document.getElementsByTagName("*");

  for (let i = 0; i < elements.length; i++) {
    const zIndex = window
      .getComputedStyle(elements[i])
      .getPropertyValue("z-index");

    if (!isNaN(zIndex) && zIndex !== "auto") {
      const intZIndex = parseInt(zIndex, 10);
      if (intZIndex > maxZIndex) {
        maxZIndex = intZIndex;
      }
    }
  }

  return maxZIndex;
};

/**
 * Plays a given sound
 * @param {string} sound - Name of sound to play
 */
export const playSound = (sound) => {
  const audio = document.createElement("audio");
  audio.style.display = "none";

  const ext = SOUNDS.get(sound);
  if (ext) {
    audio.volume = 0.5;
    audio.src = `https://www.fishtank.live/sounds/${sound}.${ext}`;
    document.body.appendChild(audio);
    audio.onended = () => {
      audio.remove();
    };
    audio.play();
  } else {
    console.warn(`Sound '${sound}' not found`, "error");
  }
};

/**
 * Checks element for a class
 * @param {Element} element
 * @param {String/Array} className
 * @returns boolean
 */
export const hasClass = (element, className) => {
  if (Array.isArray(className)) {
    return className.some((classItem) =>
      element?.classList?.contains(classItem)
    );
  }

  return element?.classList?.contains(className) || false;
};

export const areObjectsEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const disableSoundEffects = (disable) => {
  const audioElement = state.get("audioElement");

  if (audioElement === false) {
    state.set("audioElement", HTMLAudioElement.prototype.play);
    disableSoundEffects(!!disable);
    return;
  }

  HTMLAudioElement.prototype.play = function () {
    this.muted = !!disable;
    return audioElement.apply(this, arguments);
  };
};

export const isColorTooDark = (color, threshold = 40) => {
  const { r, g, b } = colorToRGB(color);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  const isTooDark = luminance < threshold;

  return isTooDark;
};

export const increaseColorBrightness = (color) => {
  const { r, g, b } = colorToRGB(color);

  const applyLowerBounds = (val) => Math.max(8, val);

  const adjustedR = applyLowerBounds(r);
  const adjustedG = applyLowerBounds(g);
  const adjustedB = applyLowerBounds(b);

  const newR = Math.min(255, Math.round(adjustedR * 15));
  const newG = Math.min(255, Math.round(adjustedG * 15));
  const newB = Math.min(255, Math.round(adjustedB * 15));

  const newColor = `rgb(${newR}, ${newG}, ${newB})`;
  return newColor;
};

export const openProfile = async (userId) => {
  const data = await fetchFromFishtank(
    "get",
    `https://www.fishtank.live/api/user/get?uid=${userId}`
  );

  const modal = new CustomEvent("modalopen", {
    detail: JSON.stringify({
      modal: "Profile",
      data: data.profile,
    }),
  });
  document.dispatchEvent(modal);
};

export const muteUser = async (user) => {
  openProfile(user.id);
  let i = 0;
  const muteInterval = setInterval(() => {
    const muteButton = document.querySelector(
      ELEMENTS.profile.actions.mute.selector
    );

    if (muteButton) {
      clearInterval(muteInterval);
      muteButton.click();
    } else if (i > 200) {
      clearInterval(muteInterval);
      playSound("denied");
    }

    i++;
  }, 10);
};

export const runUserAgreement = () => {
  const needsToAgree = config.get("agreementVersion") !== VERSION;

  if (!needsToAgree) {
    return true;
  }

  const message =
    '\nMAEJOK-TOOLS AGREEMENT:\n\nBy using MAEJOK-TOOLS you understand that this plugin is NOT endorsed nor promoted by Fishtank.live or its creators, may cause issues with the Fishtank.live webiste and alters the intended user experience for Fishtank.live; therefore, any bugs or issues created by use of this plugin does not the concern of Fishtank.live or its creators.\n\nIf you have any issues with the Fishtank.live website while using this plugin, you agree to FULLY disable this plugin from within your userscript plugin manager before making any bug reports to Fishtank.live staff.\n\nAny questions or bug reports in regards to MAEJOK-TOOLS are to be directed at @maejok only.\n\nIf you understand and agree, type "I agree" below to continue.';

  const agreement = prompt(message);

  if (agreement.toLowerCase() === "i agree") {
    updateKeybindsOnDefaultsChange();
    config.set("showUpdateNotice", true);
    config.set("agreementVersion", VERSION);
    config.save();

    setTimeout(() => {
      window.location.reload();
    }, 500);

    return false;
  } else {
    const refuseMessage =
      "You did not accept the MAEJOK-TOOLS usage agreement\nMAEJOK-TOOLS will not be started.\nDisable or remove MAEJOK-TOOLS from your userscript plugin (GreaseMonkey, Tampermonkey, etc) to disable this alert.";

    alert(refuseMessage);

    return false;
  }
};

export const pluginName = () => {
  const pluginName = state.get("packageJson")?.name || config.plugin("name");
  return pluginName;
};

export const keyEventToString = (event) => {
  if (!event) return "(none)";

  let nameTable = {
    Backquote: "`",
  };

  return (
    (event.ctrlKey && !~event.code.indexOf("Control") ? "Ctrl + " : "") +
    (event.altKey && !~event.code.indexOf("Alt") ? "Alt + " : "") +
    (event.shiftKey && !~event.code.indexOf("Shift") ? "Shift + " : "") +
    (nameTable[event.code] || event.code)
      .replace(/^Digit(\d)$/, "NumRow $1")
      .replace(/^Key([A-Z])$/, "$1")
  );
};

export const updateKeybindsOnDefaultsChange = () => {
  const binds = config.get("binds");

  // check for removed keybinds
  for (const key in binds) {
    if (!(key in DEFAULT_KEYBINDS)) {
      // Key is not in default anymore, remove it
      delete binds[key];
    }
  }

  // merge new keybinds
  for (const key in DEFAULT_KEYBINDS) {
    if (!(key in binds)) {
      binds[key] = { ...DEFAULT_KEYBINDS[key], ...binds[key] };
    }
  }

  config.set("binds", binds);
  return binds;
};

export const hasKeys = (obj, keyArray) => {
  if (typeof obj !== "object" || !Array.isArray(keyArray)) {
    return false;
  }

  return keyArray.every((key) => obj.hasOwnProperty(key));
};

export const toast = (
  message = "default message",
  type = "info",
  ms = 5000
) => {
  const toast = new CustomEvent("toastopen", {
    detail: JSON.stringify({
      type, // success, error, info, warning
      message,
      duration: ms,
      id: uuid(),
    }),
  });
  document.dispatchEvent(toast);
};

export const startMaejokTools = async () => {
  config.load();
  const cfg = config.get();
  const isPopoutChat = state.get("isPopoutChat");

  if (cfg.enableRecentChatters) {
    startRecentChatters();
  }

  disableSoundEffects(config.get("disableSoundEffects"));
  applySettingsToChat();
  toggleScanLines();
  toggleScreenTakeovers(config.get("hideScreenTakeovers"));
  observers.chat.start();

  if (config.get("hideGlobalMissions")) {
    observers.body.start();
    observers.modal.start();
  }

  const user = state.get("user");

  if (cfg.autoClanChat && user.clan !== null && !isPopoutChat) {
    enterChat(user.clan.tag);
  }

  if (cfg.persistBigScreen && !isPopoutChat) {
    toggleBigScreen(cfg.bigScreenState, true);
  }

  if (!isPopoutChat) {
    startUpdater();
  }

  const main = document.querySelector("main");

  main.addEventListener("click", leftClick);
  main.addEventListener("contextmenu", rightClick);
  main.addEventListener("dblclick", dblClick);
  document.addEventListener("keydown", keyPress);

  state.set("running", true);
};

export const stopMaejokTools = () => {
  toggleBigScreen(false);

  observers.chat.stop();
  observers.body.stop();
  observers.modal.stop();

  disableSoundEffects(false);
  stopRecentChatters();
  stopUpdater();
  toggleScanLines(false);

  clearInterval(state.get("updateCheckInterval"));
  clearInterval(state.get("daysLeftInterval"));
  state.set("updateCheckInterval", null);
  state.set("daysLeftInterval", null);

  const chat = document.querySelector(ELEMENTS.chat.list.selector);
  const home = document.querySelector(ELEMENTS.home.selector);

  home.removeEventListener("click", leftClick);
  home.removeEventListener("contextmenu", rightClick);
  chat.removeEventListener("dblclick", dblClick);
  document.removeEventListener("keydown", keyPress);

  state.set("running", false);
};

async function fetchFromFishtank(method, endpoint) {
  let data = null;
  let domain = getDomainName(endpoint);

  const authKey = "sb-wcsaaupukpdmqdjcgaoo-auth-token";
  const authToken =
    domain === "fishtank" ? getCookie(authKey).raw : getCookie(authKey).decoded;

  const Authorization =
    domain === "supabase" ? `Bearer ${getCookie(authKey).decoded}` : null;

  const Cookie = `${authKey}=${authToken}`;
  const AnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjc2FhdXB1a3BkbXFkamNnYW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxMDM4NDEsImV4cCI6MjAwNDY3OTg0MX0.xlZdK9HhTCF_fZgq8k5DCPhxJ2vhMCW1q9du4f0ZtWE";

  const options = {
    method: method.toUpperCase(),
    headers: { ApiKey: AnonKey, Cookie, Authorization },
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (Array.isArray(data)) {
      return data[0];
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function colorToRGB(color) {
  let r, g, b;

  if (color.includes("rgb")) {
    const rgb = color.replace(/[^\d,]/g, "").split(",");
    r = parseInt(rgb[0], 10);
    g = parseInt(rgb[1], 10);
    b = parseInt(rgb[2], 10);
  } else if (color.includes("#")) {
    const hex = hexColor.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else {
    return false;
  }

  return { r, g, b };
}

function closestWithClass(element, classNames) {
  return element.closest(`.${classNames.split(" ").join(", .")}`) || false;
}

function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      const str = cookie.substring(cookieName.length + 1);
      return { raw: str, decoded: JSON.parse(decodeURIComponent(str))[0] };
    }
  }
  return false;
}

function getDomainName(url) {
  try {
    const parsedUrl = new URL(url);
    const hostParts = parsedUrl.hostname.split(".");
    const domainName = hostParts.slice(-2, -1).join(".");
    return domainName;
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
}

function enterChat(destination = "Global") {
  destination =
    destination === "autoClanChat" ? getUserInfo("clan") : destination;

  const rooms = document.querySelectorAll(
    `${ELEMENTS.chat.room.options.selector} button span`
  );

  rooms.forEach((room) => {
    if (room.innerText === destination) room.click();
  });
}

function getUserInfo(property) {
  const element = document.querySelector(
    ELEMENTS.header.user[property].selector
  );
  const value = element.innerText;

  if (property === "level" && value) {
    return value.replace("LVL ", "");
  }

  return value;
}

function setCursorPosition(target) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(target);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  target.focus();
}

function checkRoomChange(node) {
  const message = node.querySelector(`${ELEMENTS.chat.system.selector} div`);
  if (message) {
    if (message.textContent.includes("Joined ")) {
      updateRecentChatters();
    }
  }
}

function processMentions(message) {
  const cfg = config.get();

  if (message.type !== "message") {
    return;
  }

  if (message.mentioned && cfg.enableMentionLog) {
    state.set("mentions", [
      ...state.get("mentions"),
      { ...message, added: Date.now() },
    ]);
  }
}
