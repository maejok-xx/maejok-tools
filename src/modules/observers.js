import state from "./state";
import { processChatMessage, getElementText } from "./functions";
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
          getElementText(ELEMENTS.header.user.clan.selector) || null;
        const displayName =
          getElementText(ELEMENTS.header.user.name.selector) || null;

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

  modal: {
    start: () => {
      state.get("observers").modal?.disconnect();

      const nextElement = document.getElementById("__next");

      const bodyObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.id === "modal") {
              const title = getElementText(ELEMENTS.modal.title.text.selector);
              if (title && title.includes("Global Mission")) {
                addedNode.setAttribute("style", "display: none !important");
              }
            }
          });
        });
      });

      bodyObserver.observe(nextElement, { childList: true });

      state.set("observers", {
        ...state.get("observers"),
        body: bodyObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.modal?.disconnect();
    },
  },

  body: {
    start: () => {
      state.get("observers").body?.disconnect();

      const body = document.querySelector("body");

      const bodyObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0 ||
            !mutation.addedNodes[0].className ||
            !mutation.addedNodes[0].className.includes(
              "global-mission-modal_backdrop__oVezg"
            )
          ) {
            return;
          }

          mutation.addedNodes[0].setAttribute(
            "style",
            "display: none !important"
          );
        });
      });

      bodyObserver.observe(body, { childList: true });

      state.set("observers", {
        ...state.get("observers"),
        body: bodyObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.body?.disconnect();
    },
  },
};

export default observers;
