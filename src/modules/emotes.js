import config from "./config";
import state from "./state";
import { pluginName } from "./functions";
import { handleUseEmote, handlePinEmote } from "./events";
import Modal from "../classes/Modal";
import ELEMENTS from "../data/elements";
import { Emotes, Demotes } from "../data/emotes";

export const createEmotesList = () => {
  const displayName = state.get("user")?.displayName;
  const pinnedEmotes = config.get("pinnedEmotes");
  const eventListeners = [];

  let emotes = Object.keys(Emotes)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = Emotes[key];
      return sorted;
    }, {});

  const createEmotes = (isPinnedEmotes = false) => {
    Object.keys(emotes).forEach((command) => {
      const isPinned = pinnedEmotes.includes(command);

      if (isPinnedEmotes && !isPinned) {
        return;
      }

      if (!isPinnedEmotes && isPinned) {
        return;
      }

      const multiEmote = Array.isArray(emotes[command]);

      if (multiEmote) {
        emotes[command] = emotes[command][0];
      }

      const emote = emotes[command].replace(
        "$displayName",
        `<b>${displayName}</b>`
      );

      const listItem = document.createElement("div");
      listItem.classList.add(ELEMENTS.emotes.list.item.class);

      const itemCommand = document.createElement("div");
      itemCommand.classList.add(
        Demotes.includes(command)
          ? ELEMENTS.emotes.list.item.command.demote.class
          : ELEMENTS.emotes.list.item.command.class
      );

      itemCommand.innerHTML = `/${command} ${multiEmote ? "*" : ""}`;
      listItem.appendChild(itemCommand);

      const itemEmote = document.createElement("div");
      itemEmote.classList.add(ELEMENTS.emotes.list.item.emote.class);
      itemEmote.innerHTML = `${emote}`;
      listItem.appendChild(itemEmote);

      const itemPin = document.createElement("button");
      itemPin.classList.add(ELEMENTS.emotes.list.item.pin.class);
      itemPin.setAttribute("data-emote-command", command);
      itemPin.textContent = isPinned ? "Unpin" : "Pin";
      listItem.appendChild(itemPin);

      const itemUse = document.createElement("button");
      itemUse.classList.add(ELEMENTS.emotes.list.item.use.class);
      itemUse.setAttribute("data-emote-command", command);
      itemUse.textContent = "Use";
      listItem.appendChild(itemUse);

      itemPin.addEventListener("click", handlePinEmote);
      eventListeners.push({
        element: itemPin,
        event: "click",
        listener: handlePinEmote,
      });

      itemUse.addEventListener("click", (event) =>
        handleUseEmote(event, modal, eventListeners)
      );
      eventListeners.push({
        element: itemUse,
        event: "click",
        listener: (event) => handleUseEmote(event, modal, eventListeners),
      });

      list.appendChild(listItem);
    });
  };

  const modal = new Modal(`${pluginName().toUpperCase()} - Emotes List`);

  const wrapper = document.createElement("div");
  wrapper.classList.add(ELEMENTS.emotes.class);

  const note = document.createElement("div");
  note.classList.add(ELEMENTS.emotes.note.class);
  note.innerHTML = `<p>* denotes an emote that has multiple outcomes.</p><p>After Pinning/Unpinning an emote, you must close and reopen this window to see the changes.</p>`;
  wrapper.appendChild(note);

  const list = document.createElement("div");
  list.classList.add(ELEMENTS.emotes.list.class);

  if (config.get("pinnedEmotes").length !== 0) {
    const pinnedLabel = document.createElement("div");
    pinnedLabel.classList.add(ELEMENTS.emotes.list.label.class);
    pinnedLabel.textContent = "Pinned Emotes";
    list.appendChild(pinnedLabel);

    createEmotes(true);

    const line = document.createElement("hr");
    list.appendChild(line);
  }

  createEmotes(false);

  wrapper.appendChild(list);

  modal.setBody(wrapper);

  return modal;
};
