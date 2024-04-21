import config from "../modules/config";
import state from "../modules/state";
import * as functions from "../modules/functions";
import ELEMENTS from "../data/elements";

export default class Message {
  constructor(node) {
    this.node = node;
    this.type = this.getType();
    this.sender = this.getSender();
    this.body = this.getBody();
    this.timestamp = this.getTimestamp();
    this.mentions = this.getMentions();
    this.mentioned = this.isMentioned();
    this.html = this.getMessageHTML();
    this.fish = this.isFish();
    this.grand = false;
    this.epic = false;
    this.staff = false;
  }

  getType() {
    const classMap = {
      [ELEMENTS.chat.emote.class]: "emote",
      [ELEMENTS.chat.scroll.class]: "scroll",
      [ELEMENTS.chat.system.class]: "system",
      [ELEMENTS.chat.message.class]: "message",
      [ELEMENTS.chat.consumable.class]: "consumable",
      [ELEMENTS.chat.clan.class]: "clan",
      [ELEMENTS.chat.tts.class]: "tts",
      [ELEMENTS.chat.sfx.class]: "sfx",
    };

    const classNames = this.node.className.split(" ");
    for (const className of classNames) {
      if (classMap.hasOwnProperty(className)) {
        const type = classMap[className];

        if (type === "emote") {
          const emoteBody =
            functions.getElementText(
              this.node,
              ELEMENTS.chat.emote.body.selector
            ) || false;
          if (emoteBody?.includes("rolls a 20-sided dice")) {
            return "roll";
          }
        }

        return type;
      }
    }
  }

  getMessageHTML() {
    if (this.type !== "message") {
      return false;
    }

    return this.node.outerHTML || false;
  }

  getSender() {
    const validTypes = ["message", "emote"];
    if (!validTypes.includes(this.type)) {
      return false;
    }

    const senderSelector = ELEMENTS.chat[this.type].sender.selector;
    const wesSelector = ELEMENTS.chat.message.wes.class;
    const fishSelector = ELEMENTS.chat.message.fish.class;
    const adminSelector = ELEMENTS.chat.message.admin.class;

    this.staff = functions.hasClass(this.node, wesSelector)
      ? "wes"
      : functions.hasClass(this.node, fishSelector)
      ? "fish"
      : functions.hasClass(this.node, adminSelector)
      ? "admin"
      : false;

    const id = this.node.getAttribute("data-user-id") || false;

    const displayName = functions.getSender(this.node, this.type);

    const html = this.node.querySelector(senderSelector)?.outerHTML || false;

    return { id, displayName, html, staff: this.staff };
  }

  getBody() {
    const validTypes = ["message", "emote", "happening", "system"];

    if (!validTypes.includes(this.type)) {
      return;
    }

    const selector =
      this.type === "message"
        ? ELEMENTS.chat[this.type].body.text.selector
        : ELEMENTS.chat[this.type].body.selector;

    const body = functions.getElementText(this.node, selector) || false;

    const html =
      this.type === "message"
        ? this.node.querySelector(selector).innerHTML || false
        : false;

    return { body, html };
  }

  getMentions() {
    if (this.type !== "message") {
      return;
    }
    const mentionElements = this.node.querySelectorAll(
      ELEMENTS.chat.message.mention.selector
    );

    const mentions = Array.from(mentionElements).map((mention) =>
      mention.innerText.replace("@", "")
    );

    return mentions;
  }

  getTimestamp() {
    if (this.type !== "message") {
      return;
    }

    return (
      functions.getElementText(
        this.node,
        ELEMENTS.chat.message.timestamp.selector
      ) || false
    );
  }

  isMentioned() {
    if (this.type !== "message") {
      return;
    }

    const hasMentions =
      Array.isArray(this.mentions) && this.mentions.length > 0;

    if (!hasMentions) {
      return;
    }

    const user = state.get("user");

    if (!user) {
      return false;
    }

    const lowercaseMentions = this.mentions.map((mention) =>
      mention.toLowerCase()
    );
    const lowercaseDisplayName = user.displayName.toLowerCase();
    const isMentioned = lowercaseMentions.includes(lowercaseDisplayName);

    return isMentioned;
  }

  isFish() {
    if (this.type !== "message") {
      return false;
    }
    this.fish = this.sender.displayName.includes("🐟");
    return this.fish;
  }

  isGrand() {
    if (this.type !== "message") {
      return false;
    }

    const selector = ELEMENTS.chat.message.grand.selector;

    return !!this.node.querySelector(selector);
  }

  isEpic() {
    if (this.type !== "message") {
      return false;
    }

    const selector = ELEMENTS.chat.message.epic.selector;

    return !!this.node.querySelector(selector);
  }

  normalizeEpic() {
    if (!this.isEpic()) {
      return;
    }

    const shouldNormalize = config.get("normalizeEpicText");
    const { selector, normalize } = ELEMENTS.chat.message.epic;

    const element = this.node.querySelector(selector);

    element.classList.toggle(normalize.class, shouldNormalize);
  }

  normalizeGrand() {
    if (!this.isGrand()) {
      return;
    }

    const shouldNormalize = config.get("normalizeGrandText");
    const { selector, normalize } = ELEMENTS.chat.message.grand;

    const messageText = this.node.querySelector(selector);

    this.node.classList.toggle(normalize.class, shouldNormalize);
    messageText.classList.toggle(normalize.class, shouldNormalize);
  }

  fixDarkDisplayName() {
    const validTypes = ["message", "emote"];
    if (!validTypes.includes(this.type) || !config.get("fixDarkDisplayNames")) {
      return false;
    }

    const senderSelector = ELEMENTS.chat[this.type].sender.selector;
    const nameElement = this.node.querySelector(senderSelector);
    const nameColor = nameElement?.style.color;

    if (!nameColor) {
      return;
    }

    const isTooDark = functions.isColorTooDark(nameColor);

    if (isTooDark) {
      const newColor = functions.increaseColorBrightness(nameColor);
      nameElement.setAttribute("style", `color: ${newColor}`);
    }
  }

  hideElements(elements, hide) {
    if (this.type !== "message") {
      return;
    }

    elements = Array.isArray(elements) ? elements : [elements];

    elements.forEach((element, index) => {
      const selector = ELEMENTS.chat.message[element].selector;
      const item = this.node.querySelector(selector);
      if (item) {
        if (element === "avatar") {
          const levelSelector = ELEMENTS.chat.message.level.selector;
          const level = this.node.querySelector(levelSelector);
          if (item) item.classList.toggle("maejok-hide", hide[index]);
          if (level)
            level.classList.toggle("maejok-hide_avatar-fix", hide[index]);
        } else {
          item.classList.toggle("maejok-hide", hide[index]);
        }
      }
    });
  }

  highlightMessage() {
    if (this.type !== "message") {
      return;
    }

    const watching = functions.existsInUserList("watching", this.sender.id);
    const friends = functions.existsInUserList("friends", this.sender.id);
    const contextualize = state.get("contextUser")?.id === this.sender.id;

    this.node.classList.toggle("maejok-watched-message", watching);
    this.node.classList.toggle("maejok-friend-message", friends);
    this.node.classList.toggle("maejok-context-message", contextualize);
  }

  hide() {
    this.node.classList.toggle("maejok-hide", true);
  }

  show() {
    this.node.classList.toggle("maejok-hide", false);
  }

  toggle() {
    functions.hasClass(this.node, `maejok-hide`)
      ? this.show(this.node)
      : this.hide(this.node);
  }

  destroy() {
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = null;
      }
    }
  }
}
