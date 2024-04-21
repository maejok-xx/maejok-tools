import config from "./config";
import state from "./state";
import {
  playSound,
  existsInUserList,
  openProfile,
  mentionUser,
  modifyUserList,
  muteUser,
  capitalize,
  getMinutesAgo,
} from "./functions";
import { applySettingsToChat } from "./settings";
import { createEmotesList } from "./emotes";
import Menu from "../classes/Menu";
import ELEMENTS from "../data/elements";

export const open = (type, position, options) => {
  const createMenu = (position, items, options) => {
    const menu = new Menu(position, items.filter(Boolean), options);
    return menu;
  };

  const applySettingsAndClose = () => {
    config.save();
    close();
    playSound("click-high-short");
    applySettingsToChat();
  };

  const menus = {
    chatInput: () => {
      const items = [
        {
          label: "View Emotes",
          action: () => {
            close();
            createEmotesList();
          },
        },
      ];

      const options = { title: "Options" };
      return createMenu(position, items, options);
    },

    message: (user) => {
      const isFriend = existsInUserList("friends", user.id);
      const isWatching = existsInUserList("watching", user.id);

      const items = [
        {
          label: "View Profile",
          action: () => {
            close();
            openProfile(user.id);
          },
        },
        {
          label: "Mention",
          action: () => {
            close();
            mentionUser(user.displayName);
          },
        },
        !isWatching && {
          label: isFriend ? "Remove Friend" : "Add Friend",
          action: () => {
            close();
            modifyUserList("friends", user, !isFriend);
          },
        },
        !isFriend && {
          label: isWatching ? "Unwatch" : "Watch",
          action: () => {
            close();
            modifyUserList("watching", user, !isWatching);
          },
        },
        {
          label: "Mute",
          action: () => {
            close();
            muteUser(user);
          },
        },
      ];

      const options = { title: user.displayName, titleColor: user.color };
      return createMenu(position, items, options);
    },

    chatHide: (type) => {
      const configKeyMap = {
        roll: "hideDiceRolling",
        emote: "hideEmotes",
        system: "hideSystem",
        consumable: "hideConsumables",
        clan: "hideClanMessages",
        tts: "hideTTSMessages",
        sfx: "hideSFXMessages",
      };

      const typeName =
        (type === "tts" && "TTS") || (type === "sfx" && "SFX") || undefined;

      const items = [
        {
          label: `Hide ${typeName ? typeName : capitalize(type)} Messages`,
          action: () => {
            config.set(configKeyMap[type], true);
            applySettingsAndClose();
          },
        },
      ];

      const options = { title: "Message Options" };
      return createMenu(position, items, options);
    },

    mention: (user) => {
      const userFound = typeof user === "object";
      const items = [
        {
          label: userFound ? "View Context" : "No Context Found",
          action: userFound
            ? () => {
                close();
                state.set("contextUser", user);
                applySettingsToChat();
              }
            : null,
        },
        userFound && {
          label: "View Profile",
          action: () => {
            close();
            openProfile(user.id);
          },
        },
        {
          label: "Mention",
          action: () => {
            close();
            mentionUser(user.displayName || user);
          },
        },
      ];

      const options = { title: `${user.displayName || user} (mentioned)` };
      return createMenu(position, items, options);
    },

    chatters: (users) => {
      const menuItems = [];
      const staffMap = {
        wes: "Wes",
        fish: "Season 1 Contestant",
        admin: "Moderator",
      };

      users.forEach((user) => {
        const lastSeen = getMinutesAgo(user.lastSeen);
        const staff = staffMap[user.staff] || null;
        const chatter = {
          label: user.html,
          class: ELEMENTS.chat.header.recent.menu.item.class,
          align: "left",
          hover: `${staff ? `${staff} - ` : ""}Last seen ${lastSeen}`,
          action: () => {
            mentionUser(user.displayName);
            close();
          },
        };
        menuItems.push(chatter);
      });

      const options = {
        title: "Recent Chatters",
        noItems: "Nobody here...",
        class: ELEMENTS.chat.header.recent.menu.class,
      };
      return createMenu(position, menuItems, options);
    },
  };

  const menuFunction = menus[type];

  if (menuFunction) {
    const menu = menuFunction(options);
    state.set("menu", menu);
  } else {
    console.error(`Unsupported menu type: ${type}`);
  }
};

export const close = () => {
  const menu = state.get("menu");
  if (menu) menu.destroy();
};
