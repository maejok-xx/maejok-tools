import config from "./config";
import state from "./state";
import Modal from "../classes/Modal";
import ELEMENTS from "../data/elements";
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
  toggleBigChat,
  playSound,
} from "./functions";
import * as settings from "./settings";
import * as menu from "./menu";

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
      ["roll", "emote", "system", "consumable", "clan"].includes(messageType)
    ) {
      event.preventDefault();
      menu.open("chatHide", adjustedPosition, messageType);
    }
  }
};

export const leftClick = (event) => {
  const target = event.target.cloneNode(true);

  if (isMenuItem()) {
    return;
  }

  menu.close();

  checkForTarget();

  const targets = {
    [ELEMENTS.chat.message.sender.class]: "chatUsername",
    [ELEMENTS.chat.message.avatar.class]: "chatAvatar",
    [ELEMENTS.chat.header.recent.count.class]: "recentChatters",
    [ELEMENTS.chat.header.recent.class]: "recentChatters",
  };

  const item = targets[target.className];
  if (!item) {
    return;
  }

  switch (item) {
    case "chatAvatar":
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

  function checkSecondaryPanelTabClicked() {
    const clicked = hasClass(
      event.target.parentElement?.parentElement,
      ELEMENTS.secondaryPanel.tab.class
    );

    if (clicked) {
      const returnToBigChat =
        config.get("enableBigChat") && config.get("bigChatState");

      setTimeout(() => toggleBigChat(returnToBigChat, true), 0);
      return true;
    }
    return false;
  }

  function checkAvatarClicked() {
    const clicked = hasClass(
      event.target.parentElement,
      ELEMENTS.chat.message.avatar.class
    );

    if (clicked) {
      target.className = ELEMENTS.chat.message.avatar.class;
      return true;
    }
    return false;
  }

  function checkChattersClicked() {
    const clicked = hasClass(target, [
      ELEMENTS.chat.header.recent.class,
      ELEMENTS.chat.header.recent.count.class,
    ]);

    if (clicked) {
      target.className = ELEMENTS.chat.header.recent.class;
      return true;
    }
    return false;
  }

  function checkForTarget() {
    if (checkChattersClicked()) return;
    if (checkAvatarClicked()) return;
    if (checkSecondaryPanelTabClicked()) return;
  }

  function isMenuItem() {
    return event.target.closest(ELEMENTS.menu.selector) !== null;
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
    backtick: 192,
    space: 32,
    escape: 27,
  };

  if (
    (event.ctrlKey && event.keyCode === keys.backtick) ||
    (event.ctrlKey && event.shiftKey && event.keyCode === keys.space)
  ) {
    toggleBigChat();
    return;
  }
  if (config.get("bigChatState") && event.keyCode === keys.escape) {
    toggleBigChat(false);
    return;
  }
};

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

export const clickTabButton = (tab) => {
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

function afterUpdateAlert() {
  const showAlert = () => {
    alert(
      "After updating MAEJOK-TOOLS, refresh this window to start using the new version"
    );
    document.removeEventListener("visibilitychange", showAlert);
  };

  document.addEventListener("visibilitychange", showAlert);
}
