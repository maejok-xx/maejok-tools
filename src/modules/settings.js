import config from "./config";
import state from "./state";
import { VERSION } from "./constants";
import {
  clickOpenSettingsModal,
  clickSettingsHelp,
  clickSaveHiddenInput,
  clickRemoveUserFromList,
  clickAccordionHeader,
  clickSettingsToggle,
  clickSettingsConfig,
  clickTabButton,
  clickKeybindButton,
} from "./events";
import { start as startUpdater, stop as stopUpdater } from "./updater";
import {
  toggleDimMode,
  startMaejokTools,
  stopMaejokTools,
  processChatMessage,
  toggleBigScreen,
  toggleDenseChat,
  scrollToBottom,
  mentionUser,
  pluginName,
  disableSoundEffects,
  toggleScanLines,
  toggleScreenTakeovers,
  keyEventToString,
  toggleTimestampOverlay,
} from "./functions";
import {
  start as startRecentChatters,
  stop as stopRecentChatters,
} from "./recent-chatters";
import Modal from "../classes/Modal";
import ELEMENTS from "../data/elements";
import observers from "./observers";

export const saveSettings = async () => {
  const inputs = document.querySelectorAll(
    `${ELEMENTS.settings.body.selector} input`
  );

  const prevUpdateCheckFrequency = config.get("updateCheckFrequency");
  const prevChattersEnabled = config.get("enableRecentChatters");
  const prevHideGlobalMissions = config.get("hideGlobalMissions");
  const prevDragModal = config.get("enableDragModal");

  inputs.forEach((input) => {
    const key = input.id.replace("-hidden", "");
    if (input.type === "checkbox") {
      if (input.id === "enableTTSFilterWarning" && input.checked) {
        return createTTSFilterAcknowledgmentModal();
      }

      config.set(key, input.checked ? true : false);
    } else {
      if (key === "updateCheckFrequency") {
        input.value = input.value >= 5 ? input.value : 5;
      }

      config.set(key, input.value);
    }
  });

  await config.save();

  if (!config.get("enableMentionLog")) {
    state.set("mentions", []);
  }

  disableSoundEffects(config.get("disableSoundEffects"));
  applySettingsToChat();
  toggleScanLines();
  toggleDimMode(config.get("enableDimMode"));
  toggleScreenTakeovers(config.get("hideScreenTakeovers"));
  toggleTimestampOverlay(config.get("enableTimestampOverlay"));

  if (!config.get("enableBigScreen")) {
    toggleBigScreen(false);
  }

  const startPlugin = !state.get("running") && config.get("enablePlugin");

  if (startPlugin) {
    startMaejokTools();
  }

  const stopPlugin = state.get("running") && !config.get("enablePlugin");

  if (stopPlugin) {
    stopMaejokTools();
    return;
  }

  const recentChattersJustEnabled =
    config.get("enableRecentChatters") &&
    prevChattersEnabled !== config.get("enableRecentChatters");

  if (recentChattersJustEnabled) {
    startRecentChatters();
  }

  if (!config.get("enableRecentChatters")) {
    stopRecentChatters();
  }

  const startUpdateChecker =
    !state.get("updateCheckInterval") && config.get("enableUpdateChecks");
  const restartUpdateChecker =
    config.get("enableUpdateChecks") &&
    prevUpdateCheckFrequency !== config.get("updateCheckThreshold");

  const stopUpdateChecker = !config.get("enableUpdateChecks");

  if (startUpdateChecker || restartUpdateChecker) {
    startUpdater();
  }

  if (stopUpdateChecker) {
    stopUpdater();
  }

  const hideGlobalMissionsJustEnabled =
    config.get("hideGlobalMissions") &&
    prevHideGlobalMissions !== config.get("hideGlobalMissions");
  const dragModalJustEnabled =
    config.get("enableDragModal") &&
    prevDragModal !== config.get("enableDragModal");

  if (hideGlobalMissionsJustEnabled || dragModalJustEnabled) {
    observers.body.start();
    observers.modal.start();
  }

  scrollToBottom();
};

const createTTSFilterAcknowledgmentModal = () => {
  const settingsModalButton = document.querySelector(
    ELEMENTS.modal.close.button.selector
  );
  settingsModalButton.click();
  const data = {
    title: "TTS Filter Warning Acknowledgement",
    message: `Confirm to acknowledge that this feature relies on a hardcoded list
      that may not accurately reflect what is and isn't filtered on the site.`,
    confirm: () => acknowledgeModal(true),
    close: () => acknowledgeModal(false),
  };

  const customConfirmEvent = new CustomEvent("modalopenconfirm", {
    detail: {
      data: JSON.stringify(data),
      onConfirm: data.confirm,
      onClose: data.close,
    },
  });

  document.dispatchEvent(customConfirmEvent);
};

const acknowledgeModal = (agreement) => {
  if (agreement) {
    config.set("enableTTSFilterWarning", true);
  } else {
    config.set("enableTTSFilterWarning", false);
  }
  config.save();
};

export const applySettingsToChat = () => {
  const messages = document.querySelector(ELEMENTS.chat.list.selector).children;
  const nodes = Array.from(messages);
  nodes.forEach((node) => processChatMessage(node, false));

  state.set("contextUser", null);

  const chatContainer = document.getElementById("chat-messages");
  if (config.get("hideAvatars")) {
    chatContainer.style.padding = "0px";
  } else {
    chatContainer.style.padding = "8px";
  }

  toggleDenseChat();
};

export const openTab = (tab) => {
  const panels = document.querySelectorAll(
    ELEMENTS.settings.tabs.panel.selector
  );
  for (const panel of panels) {
    panel.style.display = "none";
  }
  const content = document.querySelector(`[data-tab="${tab}"]`);
  content.style.display = "block";
};

export const createSettingsButton = () => {
  const inputActions = document.querySelector(
    ELEMENTS.chat.input.actions.selector
  );
  const inputLength = document.querySelector(
    ELEMENTS.chat.input.actions.inputLength.selector
  );
  const props = ELEMENTS.settings;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add(props.opener.button.class);
  inputActions.insertBefore(button, inputLength);

  const buttonIcon = document.createElement("div");
  buttonIcon.classList.add(...props.opener.button.icon.class);
  buttonIcon.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2257 5065 c-568 -69 -1104 -335 -1502 -747 -183 -189 -314 -369 -429 -589 -194 -371 -286 -748 -286 -1169 0 -411 85 -770 270 -1135 129 -256 261 -437 469 -646 209 -208 390 -340 646 -469 363 -184 725 -270 1135 -270 875 0 1666 439 2144 1190 179 282 320 685 361 1036 57 491 -31 987 -255 1429 -121 240 -253 426 -445 624 -402 416 -935 679 -1513 746 -153 18 -445 18 -595 0z m623 -400 c433 -67 831 -264 1144 -565 352 -339 571 -758 641 -1225 83 -563 -60 -1130 -404 -1593 -83 -112 -311 -340 -423 -423 -520 -387 -1171 -519 -1792 -364 -583 145 -1091 545 -1370 1077 -110 210 -185 439 -223 679 -24 157 -24 461 0 618 82 527 340 984 750 1327 319 268 722 438 1147 484 117 12 403 4 530 -15z"></path><path d="M1655 3526 c-86 -27 -160 -84 -210 -160 -131 -200 -55 -466 164 -573 50 -25 67 -28 161 -28 93 0 112 3 162 27 324 151 300 618  -36 731 -59 20 -183 21 -241 3z"></path><path d="M3240 3531 c-100 -33 -199 -117 -243 -206 -98 -197 -11 -438 191 -533 50 -24 69 -27 162 -27 94 0 111 3 161 28 87 42 143 98 185 183 100 202 18 439 -185 532 -46 21 -73 27 -151 29 -52 1 -106 -1 -120 -6z"></path><path d="M1455 2220 c-54 -109 -97 -201 -95 -203 3 -3 140 -70 304 -151 165 -80 297 -148 295 -150 -2 -3 -146 -52 -319 -111 -173 -58 -316 -108 -318 -110 -7 -7 133 -417 143 -421 6 -3 250 76 544 174 l534 179 504 -249 c277 -136 507 -248 511 -248 9 0 208 398 202 403 -3 2 -138 70 -300 151 -162 81 -296 149 -298 151 -2 2 141 51 316 109 l320 107 -70 212 c-39 117 -72 214 -74 215 -1 2 -244 -77 -538 -177 l-536 -181 -507 250 c-278 138 -509 250 -512 250 -4 0 -51 -90 -106 -200z"></path></g></svg>`;
  button.appendChild(buttonIcon);

  button.addEventListener("click", clickOpenSettingsModal);
  if (config.get("autoOpenSettings")) clickOpenSettingsModal;
};

export const createConfigurationInputModal = (option, parentModal) => {
  const modal = new Modal(
    `${pluginName().toUpperCase()} - ${option.config.title}`
  );

  const wrapper = document.createElement("div");
  wrapper.classList.add(ELEMENTS.settings.config.wrapper.class);

  option.config.options.forEach((optionConfig) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add(ELEMENTS.settings.config.group.class);

    const label = document.createElement("label");
    label.classList.add(ELEMENTS.inputs.textbox.label.class);
    label.setAttribute("for", optionConfig.name);
    label.textContent = optionConfig.label;
    inputGroup.appendChild(label);

    if (["input", "number"].includes(optionConfig.type)) {
      const input = document.createElement("input");
      input.classList.add(ELEMENTS.inputs.textbox.class);
      input.type = optionConfig.type;
      input.id = optionConfig.name;
      input.value = config.get(optionConfig.name);
      inputGroup.appendChild(input);
    }

    if (optionConfig.help) {
      const help = document.createElement("b");
      help.classList.add(ELEMENTS.settings.config.help.label.class);
      help.innerHTML = "?";
      help.addEventListener("click", () => clickSettingsHelp(optionConfig));
      inputGroup.appendChild(help);
    }

    wrapper.appendChild(inputGroup);
  });

  const submit = createButton("save", () => {
    clickSaveHiddenInput(option.config.options, parentModal, modal);
  });

  wrapper.appendChild(submit);

  modal.setBody(wrapper);

  return modal;
};

export const createSettingsModal = () => {
  const props = ELEMENTS.settings;

  const settingsConfig = config.settingsOptions();

  const modal = new Modal(`${pluginName().toUpperCase()} - Settings`);

  const wrapper = document.createElement("div");

  const body = document.createElement("div");
  body.classList.add(...props.body.class);

  const bar = createTabBar(props);
  wrapper.appendChild(bar);

  settingsConfig.forEach((config) => {
    const button = createTabButton(config, props);
    bar.appendChild(button);

    const panel = createTabPanel(config, props);
    createAccordions(config, panel);

    config.content.inputs?.forEach((cfg) => {
      if (cfg.disabled) return;
      else if (["toggle"].includes(cfg.type)) createToggle(cfg, panel, modal);
      else if (["button"].includes(cfg.type))
        createButtonInput(cfg, panel, modal);
      else if (["keybind"].includes(cfg.type))
        createKeybindInput(cfg, panel, modal);
      else if (["hidden"].includes(cfg.type)) createHiddenInput(cfg, panel);
      else if (["mentions-log"].includes(cfg.type))
        createMentionsLog(cfg, panel);
      else if (["color-picker"].includes(cfg.type))
        createHighlightsPanel(cfg, panel);
    });

    if (config.name === "about") {
      createAboutPanel(panel);
    }

    body.appendChild(panel);
  });

  bar.firstChild.classList.add(props.tabs.tab.active.class);

  wrapper.appendChild(body);

  modal.setBody(wrapper);

  return modal;
};

export function validateInput(accept, value) {
  switch (accept) {
    case "number":
      const onlyNumbersRegex = /^\d+$/;
      return onlyNumbersRegex.test(value);

    default:
      break;
  }
}

export const createColorButton = function (option, color, label, action) {
  const props = ELEMENTS.inputs;
  const tab_props = ELEMENTS.settings.tabs;

  const button = document.createElement("button");

  if (option?.type == "keybind") {
    button.classList.add(...props.buttons.bind.class);
  }

  if (option?.type == "button") {
    button.classList.add(...props.buttons.standard.classes);
  }

  button.background_color =
    props.buttons.img_colors[color] || props.buttons.img_colors["red"];

  button.classList.add(...tab_props.button.classes);
  const text = document.createElement("div");
  text.textContent = label;

  button.appendChild(text);

  button.addEventListener("click", function () {
    if (typeof action === "function") {
      action.call(this);
    }
    this.blur();
    button.blur();
  });

  return button;
};

export const createButton = function (type, action) {
  const props = ELEMENTS.inputs;

  const wrapper = document.createElement("div");
  wrapper.classList.add(props.buttons.wrapper.class);

  const button = document.createElement("button");
  button.classList.add(...props.buttons[type].class);

  button.addEventListener("click", action);

  const label = document.createElement("div");
  label.classList.add(props.buttons.label.class);
  label.textContent = type;

  button.appendChild(label);

  wrapper.appendChild(button);

  return wrapper;
};

export const updateBindButtons = () => {
  const buttons = document.querySelectorAll(
    ELEMENTS.inputs.buttons.bind.selector
  );

  const binds = config.get("binds");

  for (var button of buttons) {
    if (button.dataset.bindid) {
      button.querySelector(ELEMENTS.inputs.buttons.label.selector).textContent =
        keyEventToString(binds[button.dataset.bindid]);
    }
  }
};

function createAboutPanel(panel) {
  const packageJson = state.get("packageJson");

  const authorLinks = [
    {
      label: "@maejok",
      onClick: () => mentionUser("maejok"),
    },
    {
      label: "x.com/@maejok",
      onClick: () => window.open("https://twitter.com/maejok", "_blank"),
    },
    {
      label: "github.com/maejok-xx",
      onClick: () => window.open("https://github.com/maejok-xx", "_blank"),
    },
  ];

  const accordion = panel.querySelector(`[data-group-content="about"]`);
  const wrapper = document.createElement("div");
  wrapper.className = "maejok-settings-about";

  const title = document.createElement("div");
  title.classList.add("maejok-settings-about-title");
  title.textContent = `${pluginName().toUpperCase()} v${VERSION}`;
  wrapper.appendChild(title);

  const changelog = document.createElement("button");
  changelog.classList.add("maejok-settings-about-changelog", "button-link");
  changelog.textContent = `Changelog`;
  changelog.onclick = () => window.open(packageJson.changelog.url, "_blank");
  wrapper.appendChild(changelog);

  const author = document.createElement("div");
  author.classList.add("maejok-settings-about-author");
  wrapper.appendChild(author);

  const authorLabel = document.createElement("span");
  authorLabel.classList.add("maejok-settings-about-author_label");
  authorLabel.innerHTML = `<strong>Author</strong>: `;
  author.appendChild(authorLabel);

  authorLinks.forEach((link, index) => {
    const authorLink = document.createElement("button");
    authorLink.classList.add(
      "maejok-settings-about-author_link",
      "button-link"
    );
    authorLink.textContent = link.label;
    authorLink.onclick = link.onClick;
    author.appendChild(authorLink);

    if (index !== authorLinks.length - 1) {
      author.appendChild(document.createTextNode(" / "));
    }
  });

  const contributors = document.createElement("div");
  contributors.classList.add("maejok-settings-about-contributors");
  wrapper.appendChild(contributors);

  const contributorsLabel = document.createElement("span");
  contributorsLabel.classList.add("maejok-settings-about-author_label");
  contributorsLabel.innerHTML = `<strong>Contributors</strong>: `;
  contributors.appendChild(contributorsLabel);

  packageJson.contributors.forEach((contributor, index) => {
    if (index !== 0) {
      contributors.appendChild(document.createTextNode(" / "));
    }
    const contributorLink = document.createElement("button");
    contributorLink.classList.add(
      "maejok-settings-about-contact_link",
      "button-link"
    );
    contributorLink.textContent = contributor.name;
    contributorLink.onclick = () => window.open(contributor.url, "_blank");
    contributors.appendChild(contributorLink);
  });

  const message = document.createElement("div");
  message.classList.add("maejok-settings-about-message");
  message.innerHTML = `<p>This plugin is not created, promoted, nor endorsed by the creators of Fishtank Live.</p><p>If you have issues while using the plugin, disable it FULLY from your Userscript Extension (Tampermonkey, GreaseMonkey, etc) and try again before making any bug reports.  If you find that the issue goes away when the plugin is disabled, please make a bug report using <a href="https://github.com/maejok-xx/maejok-tools/issues" target="_blank">GitHub Issues</a> and I'll work on getting it fixed as soon as possible!</p><p>You can show your appreciation by tipping me tokens or by <a href="https://ko-fi.com/maejok" target="_blank">donating on Ko-fi</a>!</p><p><strong>I LOVE YOU!</strong><br/>-maejok</p>`;
  wrapper.appendChild(message);

  accordion.appendChild(wrapper);
}

function createHighlightsPanel(list, panel) {
  const accordion = panel.querySelector(`[data-group-content="${list.group}"]`);

  const wrapper = document.createElement("div");
  wrapper.classList.add(ELEMENTS.settings.accordion.content.highlights.class);

  // const exampleMessage = document.createElement("div");
  // exampleMessage.classList.add(
  //   ELEMENTS.settings.accordion.content.highlights.example.class
  // );
  // accordion.appendChild(exampleMessage);

  // exampleMessage.innerHTML = `<div id="${
  //   list.name
  // }-example-message" class="chat-message-default_chat-message-default__JtJQL" style="
  // width: 336px; margin: auto; padding: 2px;"><div class="chat-message-default_body__iFlH4"><div class="chat-message-default_avatar__eVmdi"><img src="https://cdn.fishtank.live/avatars/jon.png" alt="" width="32" height="32"><div class="chat-message-default_lvl__QXf_z chat-message-default_higher__Ktvfq">87</div></div><div><span class="chat-message-default_user__uVNvH" style="color: rgb(255, 255, 255);"><span class="chat-message-default_clan__t_Ggo" style="background-color: rgb(108, 0, 0); color: #ffffff;">[COOL]</span>${
  //   state.get("user").displayName
  // }</span><span class="chat-message-default_message__milmT">Hey, <span class="chat-message-default_mention__Ieq18">@maejok</span> you are so fucking cool! I wish I could be just like you!</span></div></div><div class="chat-message-default_timestamp__sGwZy">4/20/23, 6:09 PM</div></div>`;

  // accordion ? accordion.appendChild(wrapper) : panel.appendChild(wrapper);

  // const colorWwrapper = document.createElement("div");
  // colorWwrapper.classList.add(ELEMENTS.inputs.colorPicker.wrapper.class);
  // wrapper.appendChild(colorWwrapper);

  // colorWwrapper.innerHTML = `
  //   <div class="${ELEMENTS.inputs.colorPicker.group.class}">
  //     <span class="${ELEMENTS.inputs.colorPicker.label.class}">Background:</span>
  //     <toolcool-color-picker color="${list.value.background}"  id="${list.name}-bg-color"></toolcool-color-picker>
  //   </div>
  //   <div class="${ELEMENTS.inputs.colorPicker.group.class}">
  //     <span class="${ELEMENTS.inputs.colorPicker.label.class}">Border:</span>
  //     <toolcool-color-picker color="${list.value.outline}"  id="${list.name}-outline-color"></toolcool-color-picker>
  //   </div>
  //   <div class="${ELEMENTS.inputs.colorPicker.group.class}">
  //     <span class="${ELEMENTS.inputs.colorPicker.label.class}">Font Color:</span>
  //     <toolcool-color-picker color="${list.value.font}"  id="${list.name}-font-color"></toolcool-color-picker>
  //   </div>
  // `;

  // const $bgColor = colorWwrapper.querySelector(`#${list.name}-bg-color`);
  // const $border = colorWwrapper.querySelector(`#${list.name}-outline-color`);
  // const $font = colorWwrapper.querySelector(`#${list.name}-font-color`);
  // const exampleElement = accordion.querySelector(
  //   `#${list.name}-example-message`
  // );

  // $bgColor.addEventListener(
  //   "change",
  //   (evt) => (exampleElement.style.backgroundColor = evt.detail.hex8)
  // );
  // $border.addEventListener(
  //   "change",
  //   (evt) => (exampleElement.style.outline = evt.detail.hex8)
  // );
  // $font.addEventListener(
  //   "change",
  //   (evt) => (exampleElement.style.color = evt.detail.hex8)
  // );

  const listWrapper = document.createElement("div");
  listWrapper.classList.add(ELEMENTS.inputs.list.wrapper.class);
  wrapper.appendChild(listWrapper);

  const listItems = config.get(list.group);
  if (listItems.length === 0) {
    const emptyList = document.createElement("div");
    emptyList.classList.add(ELEMENTS.inputs.list.empty.class);
    emptyList.innerText =
      list.group === "friends" ? "You have no friends...haha!" : `Empty`;
    listWrapper.appendChild(emptyList);
  } else {
    listItems.forEach((user) => {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add(ELEMENTS.inputs.list.item.wrapper.class);
      listWrapper.appendChild(itemWrapper);

      const itemElm = document.createElement("div");
      itemElm.classList.add(ELEMENTS.inputs.list.item.class);
      itemElm.setAttribute("data-user-id", user.id);
      // itemElm.style.color = user.color;
      itemElm.innerText = user.displayName || rgb(255, 255, 255);
      itemWrapper.appendChild(itemElm);

      const remove = document.createElement("div");
      remove.classList.add(ELEMENTS.inputs.list.item.remove.class);
      remove.innerText = "❌";
      itemWrapper.appendChild(remove);
      remove.addEventListener("mouseup", () => {
        clickRemoveUserFromList(list.group, user, itemWrapper);
      });
    });
  }

  accordion.appendChild(wrapper);
}

function createMentionsLog(list, panel) {
  const reverse = config.get("reverseMentionLog");
  const props = ELEMENTS.settings;
  const log = reverse
    ? list.value.sort((a, b) => b.added - a.added)
    : list.value.sort((a, b) => a.added - b.added);

  const accordion = panel.querySelector(`[data-group-content="${list.group}"]`);

  const wrapper = document.createElement("div");
  accordion ? accordion.appendChild(wrapper) : panel.appendChild(wrapper);

  if (log.length > 0) {
    wrapper.classList.add(props.mentions.class);
    log.forEach((mention) => {
      const message = document.createElement("div");
      message.classList.add(props.mentions.item.class);
      message.innerHTML = mention.html;
      wrapper.appendChild(message);
    });
  } else {
    wrapper.innerHTML = "No mentions yet...";
    wrapper.style.color = "gray";
    wrapper.style.textAlign = "center";
  }

  accordion.appendChild(wrapper);
}

function createAccordions(tab, panel) {
  const props = ELEMENTS.settings.accordion;
  const groups = tab.content.groups;
  if (!groups) {
    return false;
  }

  groups.forEach((group, index) => {
    const header = document.createElement("button");
    header.classList.add(...props.header.class);
    header.dataset.groupHeader = group.name;
    header.dataset.tab = tab.name;
    header.innerText = group.label;

    const content = document.createElement("div");
    content.classList.add(...props.content.class);
    content.dataset.groupContent = group.name;
    content.dataset.tab = tab.name;

    panel.appendChild(header);
    panel.appendChild(content);

    if (index === 0) {
      header.classList.add(...props.active.class);
      content.style.maxHeight = 500 + "px";
    }
  });

  if (groups.length === 1) {
    return;
  }

  var accordions = panel.querySelectorAll(props.header.selector);

  accordions.forEach(function (accordion) {
    accordion.addEventListener("click", () =>
      clickAccordionHeader(accordion, panel, props)
    );
  });
}

function createToggle(option, panel, modal) {
  const props = ELEMENTS.inputs;

  const accordion = panel.querySelector(
    `[data-group-content="${option.group}"]`
  );
  const wrapper = document.createElement("div");
  wrapper.classList.add(...props.group.class);
  accordion ? accordion.appendChild(wrapper) : panel.appendChild(wrapper);

  const checkbox = document.createElement("input");
  checkbox.classList.add(...props.toggle.class);
  checkbox.type = "checkbox";
  checkbox.id = option.name;
  checkbox.checked = option.value;
  checkbox.addEventListener("change", () =>
    clickSettingsToggle(checkbox, label, modal)
  );
  wrapper.appendChild(checkbox);

  const toggle = document.createElement("label");
  toggle.classList.add(...props.toggle.label.class);
  toggle.setAttribute("for", option.name);
  wrapper.appendChild(toggle);

  const label = document.createElement("label");
  label.classList.add(...props.label.class);
  if (option.value) label.classList.add(...props.toggle.label.checked.class);
  label.setAttribute("for", option.name);
  label.textContent = option.label;
  wrapper.appendChild(label);

  if (option.config) {
    const config = document.createElement("b");
    config.classList.add(...props.help.label.config.class);
    config.innerHTML = "⚙";
    config.addEventListener("click", () => clickSettingsConfig(option, modal));
    wrapper.appendChild(config);
  }

  if (option.help) {
    const help = document.createElement("b");
    help.classList.add(...props.help.label.help.class);
    help.innerHTML = `${option.help.label}`;
    help.addEventListener("click", () => clickSettingsHelp(option));
    wrapper.appendChild(help);
  }
}

function createKeybindInput(option, panel, modal) {
  const binds = config.get("binds");
  const props = ELEMENTS.inputs;

  const accordion = panel.querySelector(
    `[data-group-content="${option.group}"]`
  );
  const wrapper = document.createElement("div");
  wrapper.classList.add(...props.group.class);
  accordion ? accordion.appendChild(wrapper) : panel.appendChild(wrapper);

  const button = createColorButton(
    option,
    "lightGreen",
    keyEventToString(binds[option.value]),
    function () {
      clickKeybindButton(this, option.label, option.value);
    }
  );
  button.setAttribute("data-bindid", option.value);

  const label = document.createElement("label");
  label.classList.add(...props.label.class);
  label.setAttribute("for", option.name);
  label.textContent = option.label;
  wrapper.appendChild(label);

  if (option.config) {
    const config = document.createElement("b");
    config.classList.add(...props.help.label.config.class);
    config.innerHTML = "⚙";
    config.addEventListener("click", () => clickSettingsConfig(option, modal));
    wrapper.appendChild(config);
  }

  if (option.help) {
    const help = document.createElement("b");
    help.classList.add(...props.help.label.help.class);
    help.innerHTML = `${option.help.label}`;
    help.addEventListener("click", () => clickSettingsHelp(option));
    wrapper.appendChild(help);
  }

  wrapper.appendChild(button);
}

function createButtonInput(option, panel, modal) {
  const props = ELEMENTS.inputs;

  const accordion = panel.querySelector(
    `[data-group-content="${option.group}"]`
  );
  const wrapper = document.createElement("div");
  wrapper.classList.add(...props.group.class);
  accordion ? accordion.appendChild(wrapper) : panel.appendChild(wrapper);

  const button = createColorButton(
    option,
    option.color,
    option.label,
    option.onclick
  );
  wrapper.appendChild(button);

  if (option.config) {
    const config = document.createElement("b");
    config.classList.add(...props.help.label.config.class);
    config.innerHTML = "⚙";
    config.addEventListener("click", () => clickSettingsConfig(option, modal));
    wrapper.appendChild(config);
  }

  if (option.help) {
    const help = document.createElement("b");
    help.classList.add(...props.help.label.help.class);
    help.innerHTML = `${option.help.label}`;
    help.addEventListener("click", () => clickSettingsHelp(option));
    wrapper.appendChild(help);
  }
}

function createHiddenInput(option, panel) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.id = `${option.name}-hidden`;
  input.value = option.value;
  panel.appendChild(input);
}

function createTabBar(props) {
  const bar = document.createElement("div");
  bar.classList.add(...props.tabs.bar.class);
  bar.style.textAlign = "center";

  return bar;
}

function createTabButton(tab, props) {
  const button = document.createElement("button");
  button.classList.add(...props.tabs.button.classes);

  const text = document.createElement("div");
  text.textContent = tab.label;

  button.appendChild(text);

  text.addEventListener("click", () => clickTabButton(tab, button));

  return button;
}

function createTabPanel(tab, props) {
  const panel = document.createElement("div");
  panel.classList.add(...props.tabs.panel.class);
  panel.dataset.tab = tab.name;

  return panel;
}
