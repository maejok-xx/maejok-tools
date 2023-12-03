import state from "./state";
import { setChatInputValue, playSound, pluginName } from "./functions";
import Modal from "../classes/Modal";
import ELEMENTS from "../data/elements";
import { Emotes, Demotes } from "../data/emotes";

export const createEmotesList = () => {
  const displayName = state.get("user").displayName;
  const eventListeners = [];

  const modal = new Modal(`${pluginName().toUpperCase()} - Emotes List`);

  let emotes = Object.keys(Emotes)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = Emotes[key];
      return sorted;
    }, {});

  const handleUseButtonClick = (event) => {
    playSound("shutter");
    const command = event.currentTarget.getAttribute("data-emote-command");
    setChatInputValue(`/${command}&nbsp;`);
    modal.destroy();
    eventListeners.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
  };

  const wrapper = document.createElement("div");
  wrapper.classList.add(ELEMENTS.emotes.class);

  const list = document.createElement("div");
  list.classList.add(ELEMENTS.emotes.list.class);

  Object.keys(emotes).forEach((command) => {
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

    itemCommand.innerHTML = `/${command}`;
    listItem.appendChild(itemCommand);

    const itemEmote = document.createElement("div");
    itemEmote.classList.add(ELEMENTS.emotes.list.item.emote.class);
    itemEmote.innerHTML = `${emote}`;
    listItem.appendChild(itemEmote);

    const itemUse = document.createElement("button");
    itemUse.classList.add(ELEMENTS.emotes.list.item.use.class);
    itemUse.setAttribute("data-emote-command", command);
    itemUse.textContent = "Use";
    listItem.appendChild(itemUse);

    itemUse.addEventListener("click", handleUseButtonClick);
    eventListeners.push({
      element: itemUse,
      event: "click",
      listener: handleUseButtonClick,
    });

    list.appendChild(listItem);
  });

  wrapper.appendChild(list);

  modal.setBody(wrapper);

  return modal;
};
