import config from "./config";
import state from "./state";
import Modal from "../classes/Modal";
import ELEMENTS from "../data/elements";
import { ROOMS, DEFAULT_KEYBINDS } from "./constants";
import {
  areObjectsEqual,
  getMessageType,
  hasClass,
  getElementText,
  findUserByName,
  getUserFromChat,
  mentionUser,
  existsInUserList,
  modifyUserList,
  toggleBigScreen,
  playSound,
  setChatInputValue,
  toggleItemInList,
  inputIsFocused,
  keyEventToString,
} from "./functions";
import * as settings from "./settings";
import * as menu from "./menu";

export const makeDraggable = () => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const modal = document.querySelector(`[class^="modal_modal__MS70U"]`);
  const header = modal.querySelector(`[class^="modal_header__O0ebJ"]`);
  if (!header) {
    return;
  }

  setTimeout(() => {
    modal.style.top = `${modal.offsetTop}px`;
    modal.style.left = `${modal.offsetLeft}px`;
    modal.style.position = "absolute";
    header.style.cursor = "move";

    const dragMouseDown = (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      modal.style.top = `${modal.offsetTop - pos2}px`;
      modal.style.left = `${modal.offsetLeft - pos1}px`;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    header.onmousedown = dragMouseDown;
  });
};

export const rightClick = (event) => {
  if (!config.get("enableChatMenu") && !config.get("enableEmotesMenu")) {
    return;
  }

  const target = event.target;
  const menuState = state.get("menu");
  const position = { x: event.clientX, y: event.clientY };
  const adjustedPosition = { ...position, y: position.y + 3 };

  if (menuState) {
    if (areObjectsEqual(state.get("prevMousePos"), position)) {
      menu.close();
      return;
    }
    menu.close();
  }

  state.set("prevMousePos", position);
  const isChatInput = event.target.closest(ELEMENTS.chat.input.form.selector);
  if (isChatInput && config.get("enableEmotesMenu")) {
    event.preventDefault();
    menu.open("chatInput", adjustedPosition);
    return;
  }

  const isChatList = event.target.closest(ELEMENTS.chat.list.selector);
  if (isChatList && config.get("enableChatMenu")) {
    const messageType = getMessageType(target);
    if (messageType === "message") {
      const isMention = hasClass(
        event.target,
        ELEMENTS.chat.message.mention.class
      );

      if (isMention) {
        const displayName = getElementText(target).replace("@", "");
        const user = findUserByName(displayName);
        event.preventDefault();
        menu.open("mention", adjustedPosition, user || displayName);
        return;
      }

      const user = getUserFromChat(target);

      if (!user) {
        return;
      }

      event.preventDefault();
      menu.open("message", adjustedPosition, user);
    }

    if (
      ["roll", "emote", "system", "consumable", "clan", "tts", "sfx"].includes(
        messageType
      )
    ) {
      event.preventDefault();
      menu.open("chatHide", adjustedPosition, messageType);
    }
  }
};

export const leftClick = (event) => {
  const target = event.target;

  if (isMenuItem()) {
    return;
  }

  menu.close();

  const item = checkClickedItem();

  switch (item) {
    case "bigScreen":
      const returnToBigScreen =
        config.get("enableBigScreen") &&
        config.get("bigScreenState") &&
        state.get("bigScreenState");

      setTimeout(() => toggleBigScreen(returnToBigScreen, true), 0);
      break;
    case "chatAvatar":
      target.className = ELEMENTS.chat.message.avatar.class;
      break;
    case "chatUsername":
      if (!config.get("enableImprovedTagging")) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      const user = getUserFromChat(event.target);

      if (!user) {
        return;
      }

      mentionUser(user.displayName);
      break;
    case "recentChatters":
      const rect = event.target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.bottom;

      const users = state.get("recentChatters");

      menu.open("chatters", { x, y }, users);
      break;
  }

  function checkClickedItem() {
    const targets = {
      [ELEMENTS.chat.message.sender.class]: {
        target: target,
        item: "chatUsername",
      },
      [ELEMENTS.chat.message.avatar.class]: {
        target: target.parentElement,
        item: "chatAvatar",
      },
      [ELEMENTS.chat.header.presence.wrapper.class]: {
        target: target.parentElement,
        item: "recentChatters",
      },
      [ELEMENTS.chat.header.presence.class]: {
        target: target.parentElement,
        item: "recentChatters",
      },
      [ELEMENTS.secondaryPanel.tab.class]: {
        target: target.parentElement?.parentElement,
        item: "bigScreen",
      },
    };

    let foundTarget;
    for (const [targetClass, value] of Object.entries(targets)) {
      let currentTarget = value.target;

      if (currentTarget.classList.contains(targetClass)) {
        foundTarget = value.item;
      }
    }

    return foundTarget;
  }

  function isMenuItem() {
    return target.closest(ELEMENTS.menu.selector) !== null;
  }
};

export const dblClick = (event) => {
  const target = event.target;

  // watched users
  const messageTargets = [target, target.parentElement];
  const messageClasses = [
    ELEMENTS.chat.message.body.class,
    ELEMENTS.chat.message.body.text.class,
  ];

  const isMessage = messageTargets.some((element) =>
    hasClass(element, messageClasses)
  );

  if (isMessage) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    const user = getUserFromChat(target);
    const isFriend = existsInUserList("friends", user.id);
    if (isFriend) {
      toast(
        `Can't add friends to Watching list! Remove ${user.displayName} from friends list first.`,
        "error"
      );
      return;
    }
    const isWatching = existsInUserList("watching", user.id);
    modifyUserList("watching", user, !isWatching);
  }
};

export const keyPress = (event) => {
  if (!state.get("loaded") || state.get("isPopoutChat")) {
    return;
  }

  const keys = {
    backtick: "Backquote",
    space: "Space",
    escape: "Escape",
  };

  if (
    (event.ctrlKey && event.code === keys.backtick) ||
    (event.ctrlKey && event.shiftKey && event.code === keys.space)
  ) {
    toggleBigScreen();
    return;
  }

  if (config.get("bigScreenState") && event.code === keys.escape) {
    toggleBigScreen(false);
    return;
  }

  const keycombo = {
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    code: event.code,
  };

  const keyPrompt = document.querySelector(ELEMENTS.modal.prompt.selector);

  if (keyPrompt) {
    keyPrompt.querySelector(
      ELEMENTS.modal.prompt.keyname.selector
    ).textContent = keyEventToString(keycombo);
    keyPrompt.querySelector(".error").style.display = "none";

    const bindcfg = config.get("binds");
    for (let i in bindcfg) {
      if (areObjectsEqual(bindcfg[i], keycombo)) {
        keyPrompt.querySelector(".error").style.display = "block";
        break;
      }
    }

    state.set("pendingKeybind", keycombo);
    //playSound("tick-short");

    event.stopPropagation();
    event.preventDefault();
    return;
  } else {
    if (config.get("bindsEnable") && !inputIsFocused()) {
      const forceCtrl = config.get("bindsForceCtrl");
      if (!keycombo.ctrlKey && forceCtrl) return;

      const bindMap = config.get("binds");

      if (compareKeybind(keycombo, bindMap["toggle-auto"])) {
        document
          .querySelector(
            '.live-streams-auto-mode_live-streams-auto-mode__pE2X_ input[type="checkbox"]'
          )
          ?.click();
        event.stopPropagation();
        event.preventDefault();
        return;
      } else if (compareKeybind(keycombo, bindMap["close-stream"])) {
        document
          .querySelector(".live-stream-fullscreen_close__JY_lb > button")
          ?.click();
        event.stopPropagation();
        event.preventDefault();
        return;
      } else if (compareKeybind(keycombo, bindMap["toggle-hq"])) {
        document
          .querySelector(
            '.live-stream-controls_right__u0Dox input[type="checkbox"]'
          )
          ?.click();
        event.stopPropagation();
        event.preventDefault();
        return;
      } else if (compareKeybind(keycombo, bindMap["enter-native-fs"])) {
        document
          .querySelector("#live-stream-player video")
          ?.requestFullscreen();
        event.stopPropagation();
        event.preventDefault();
        return;
      } else {
        for (let i in ROOMS) {
          let j = bindMap[ROOMS[i].id];

          if (
            compareKeybind(keycombo, j) &&
            typeof ROOMS[i].switchTo === "function"
          ) {
            ROOMS[i].switchTo();
            event.stopPropagation();
            event.preventDefault();
            return;
          }
        }
      }
    }
  }
};

function compareKeybind(input, bind) {
  if (!input || !bind) return false;
  return (
    input.code == bind.code &&
    (input.ctrlKey == bind.ctrlKey ||
      (input.ctrlKey && config.get("bindsForceCtrl") && !bind.ctrlKey)) &&
    input.altKey == bind.altKey &&
    input.shiftKey == bind.shiftKey
  );
}

export const clickCloseModal = (modal) => {
  playSound("click-high-short");
  modal.destroy(modal.container);
};

export const clickOpenSettingsModal = () => {
  playSound("click-high-short");
  settings.createSettingsModal();
  settings.openTab("main");
};

export const clickSettingsToggle = (toggle, label, modal) => {
  playSound("shutter");
  if (toggle.checked) {
    label.classList.add("maejok-input-label-checked");
  } else {
    label.classList.remove("maejok-input-label-checked");
  }

  settings.saveSettings(modal);
};

export const clickSaveHiddenInput = (configs, settingsModal, configModal) => {
  configs.forEach((config) => {
    const input = document.getElementById(config.name);
    const isValid = settings.validateInput(config.valid, input.value);
    if (isValid) {
      const hiddenInput = document.getElementById(`${config.name}-hidden`);
      hiddenInput.value = input.value;
    }
  });

  settings.saveSettings(settingsModal);
  configModal.destroy();
};

export const clickAccordionHeader = (accordion, panel, props) => {
  playSound("shutter");
  var panel = accordion.nextElementSibling;

  if (hasClass(accordion, props.active.class[0])) {
    accordion.classList.remove(props.active.class[0]);
    panel.style.maxHeight = null;
  } else {
    var allPanels = panel.parentElement.querySelectorAll(
      props.content.selector
    );

    allPanels.forEach(function (content) {
      content.style.maxHeight = null;
    });

    var allHeaders = panel.parentElement.querySelectorAll(
      props.header.selector
    );

    allHeaders.forEach(function (header) {
      header.classList.remove(props.active.class[0]);
    });

    accordion.classList.add(props.active.class[0]);
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
};

export const clickTabButton = (tab, element) => {
  const activeClass = ELEMENTS.settings.tabs.tab.active.class;
  const wrapper = element.parentElement;

  for (const child of wrapper.children) {
    child.classList.remove(activeClass);
  }
  element.classList.add(activeClass);

  playSound("click-high-short");
  settings.openTab(tab.name);
};

export const clickSettingsHelp = (option) => {
  const modal = new Modal(`${option.label} - Help`);

  const body = document.createElement("div");
  body.classList.add(ELEMENTS.settings.config.help.class);

  body.innerHTML = option.help.text;

  modal.setBody(body);
};

export const clickSettingsConfig = (option, modal) => {
  settings.createConfigurationInputModal(option, modal);
};

export const clickRemoveUserFromList = (list, user, elementToRemove) => {
  const removed = modifyUserList(list, user, false);
  if (removed) {
    elementToRemove.remove();
  }
};

export const clickUpdate = () => {
  const packageJSON = state.get("packageJson");

  if (!packageJSON?.update.url) {
    return;
  }

  const updateWindow = window.open(packageJSON.update.url, "maejok_update");

  setTimeout(() => {
    updateWindow.close();
    afterUpdateAlert();
  }, 1000);
};

export const clickUpdateChangelog = () => {
  const packageJSON = state.get("packageJson");

  if (!packageJSON?.changelog.url) {
    return;
  }

  window.open(packageJSON.changelog.url, "maejok_update_changelog");
};

export const clickUpdateDismiss = () => {
  const updateMessage = document.getElementById("maejok-update-message");
  const clickHere = updateMessage.querySelector(".maejok-update-click_here");
  const changeLog = updateMessage.querySelector(".maejok-update-changelog");
  const dismiss = updateMessage.querySelector(".maejok-update-dismiss");

  if (!updateMessage) {
    return;
  }

  clickHere?.removeEventListener("click", clickUpdate);
  changeLog.removeEventListener("click", clickUpdateChangelog);
  dismiss.removeEventListener("click", clickUpdateDismiss);
  updateMessage.remove();
};

export const handleUseEmote = (event, modal, eventListeners) => {
  return;

  playSound("shutter");
  const command = event.currentTarget.getAttribute("data-emote-command");
  setChatInputValue(`/${command}&nbsp;`);
  modal.destroy();
  eventListeners.forEach(({ element, event, listener }) => {
    element.removeEventListener(event, listener);
  });
};

export const handlePinEmote = (event) => {
  playSound("shutter");
  const command = event.currentTarget.getAttribute("data-emote-command");

  const added = toggleItemInList("pinnedEmotes", command);

  event.currentTarget.textContent = added ? "Unpin" : "Pin";
};

export const clickKeybindButton = (button, label, key) => {
  playSound("shutter");
  state.set("pendingKeybind", null);

  if (document.querySelector(ELEMENTS.modal.prompt.class)) return;

  let prompt = new Modal("Rebind Key");
  let bodyhtml = `Input a key or key combo to set a new keybind for:<br />`;

  const roomname = document.createElement("div");
  roomname.classList.add(ELEMENTS.modal.prompt.roomname.class);
  roomname.textContent = label;

  const keyname = document.createElement("div");
  keyname.classList.add(ELEMENTS.modal.prompt.keyname.class);
  keyname.textContent = "(none)";

  const errorText = document.createElement("div");
  errorText.classList.add("error");
  errorText.textContent = "Conflicts with an existing keybind!";
  errorText.style.display = "none";

  const confirmBtn = settings.createButton("save", function () {
    playSound("shutter");
    let bind = state.get("pendingKeybind");
    if (bind) {
      let val = {};
      val[key] = bind;
      config.set("binds", val);
      settings.saveSettings();
      button.textContent = keyEventToString(bind);
    }
    state.set("pendingKeybind", null);
    prompt.destroy();
  });

  const body = document.createElement("div");
  body.classList.add(ELEMENTS.settings.config.help.class);
  body.innerHTML = bodyhtml;
  body.append(roomname);
  body.append(document.createElement("br"));
  body.append(keyname);
  body.append(errorText);
  body.append(confirmBtn);
  prompt.setBody(body);

  prompt.getElement().classList.add(ELEMENTS.modal.prompt.class);
};

export const clickResetKeybindButton = () => {
  playSound("shutter");
  config.set("binds", DEFAULT_KEYBINDS);
  settings.saveSettings();
  settings.updateBindButtons();
};

function afterUpdateAlert() {
  const showAlert = () => {
    alert(
      "After updating MAEJOK-TOOLS, refresh this window to start using the new version"
    );
    document.removeEventListener("visibilitychange", showAlert);
  };

  document.addEventListener("visibilitychange", showAlert);
}
