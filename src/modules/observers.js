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
            if (addedNode.innerHTML.includes("Application error:")) {
              addedNode.innerHTML =
                addedNode.innerHTML +
                `<div style="background-color: rgba(0,0,0,0.5); padding: 10px; width: 775px; line-height: 1em; color: red; font-weight: 900; font-size: 2em; text-shadow: 0 0 3px maroon">MAEJOK-TOOLS NOTICE</div><div style="background-color: rgba(0,0,0,0.5); width: 775px; color: #ff7b7b; font-weight: 900; padding: 10px; text-shadow: 0 0 6px black">Something happened and the site crashed...<br/><br/>Please, for the love of everything holy, DISABLE MAEJOK-TOOLS AND CONFIRM THE PLUGIN IS NOT THE CAUSE OF THE ERROR *BEFORE* MAKING ANY BUG REPORTS<br/><br/>If the error no longer exists after disabling the plugin, <a href="https://github.com/maejok-xx/maejok-tools/issues" target="_blank" style="color: #4747ff;">report the bug on GitHub</a> Or by  <a href="https://twitter.com/maejok" target="_blank" style="color: #4747ff;">contacting @maejok</a><br/><br/>However, if, AND ONLY IF, the error persists after fully disabling MAEJOK-TOOLS from within your UserScript extension, you may report the bug on <a href="https://discord.gg/fishtankislive" target="_blank" style="color: #4747ff;">Fishcord</a><br/><br/>DO NOT <u><b>UNDER ANY CIRCUMSTANCE</u></b> CONTACT WES, JET, FISHTANK STAFF OR ANYONE ELSE ABOUT A BUGS CAUSED BY MAEJOK-TOOLS!</div>`;
            }

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
