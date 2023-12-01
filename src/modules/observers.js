import state from "./state";
import { processChatMessage } from "./functions";
import ELEMENTS from "../data/elements";

const observers = {
  chat: {
    start: () => {
      state.get("observers").chat?.disconnect();

      const chat = document.querySelector(ELEMENTS.chat.list.selector);

      const chatObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          mutation.addedNodes.forEach((addedNode) => {
            processChatMessage(addedNode);
          });
        });
      });

      chatObserver.observe(chat, { childList: true });

      state.set("observers", { ...state.get("observers"), chat: chatObserver });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.chat?.disconnect();
    },
  },

  user: {
    start: () => {
      state.get("observers").user?.disconnect();

      const userInfo = document.querySelector(ELEMENTS.header.user.selector);

      const userObserver = new MutationObserver(async (mutations) => {
        const userData = state.get("user");
        const clanTag =
          functions.getElementText(ELEMENTS.header.user.clan.selector) || null;
        const displayName =
          functions.getElementText(ELEMENTS.header.user.name.selector) || null;

        const newUserData = {
          clan: clanTag ? { tag: clanTag } : null,
          displayName,
        };
        state.set("user", { ...userData, ...newUserData });
      });

      userObserver.observe(userInfo, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });

      state.set("observers", {
        ...state.get("observers"),
        user: userObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.user?.disconnect();
    },
  },
};

export default observers;
