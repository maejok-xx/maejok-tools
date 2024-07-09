import state from "./state";
import { pluginName } from "./functions";
import { clickResetKeybindButton } from "./events";

const Config = () => {
  const configObj = {
    userData: null,
    enablePlugin: true,
    enableDimMode: false,

    enableBigScreen: true,
    persistBigScreen: false,
    bigScreenState: false,
    disableSoundEffects: false,
    hideGlobalMissions: false,
    hideScreenTakeovers: false,

    enableUpdateChecks: true,
    updateCheckFrequency: 10,
    showUpdateNotice: false,

    hideScanLines: false,

    hideTimestamps: true,
    hideAvatars: false,
    hideClans: false,
    hideLevels: false,
    hideEndorsements: false,
    hideConsumables: false,
    hideEmotes: false,
    hideDiceRolling: false,
    hideClanMessages: false,
    hideTTSMessages: false,
    hideSFXMessages: false,
    hideSystem: false,

    enableImprovedTagging: true,
    enableEmojis: false,

    enableDenseChat: false,

    enableRecentChatters: true,
    recentChattersThreshold: 10,

    normalizeEpicText: false,
    normalizeGrandText: false,

    autoClanChat: false,
    enableEmotesMenu: true,
    pinnedEmotes: [],
    enableChatMenu: true,
    fixDarkDisplayNames: false,

    enableMentionLog: true,
    reverseMentionLog: false,

    agreementVersion: null,

    bindsEnable: false,
    bindsForceCtrl: false,
    binds: {},

    friends: [],
    watching: [],
    // friendsColor: {
    //   background: "rgba(0, 149, 255, 0.1)",
    //   outline: "rgba(0, 149, 255, 0.25)",
    //   font: "rgb(255,255,255)",
    // },
    // watchingColor: {
    //   background: "rgba(0, 255, 4, 0.1)",
    //   outline: "rgba(0, 255, 4, 0.25)",
    //   font: "rgb(255,255,255)",
    // },
  };

  const pluginObj = {
    name: "MAEJOK-TOOLS-RENEWED",
    storageKey: "maejok-tools-v2r",
  };

  const settingsOptions = () => {
    const cfg = load();

    const settingsConfig = [
      // --- MAIN
      {
        name: "main",
        label: "Main",
        content: {
          groups: [
            { name: "plugin", label: "Plugin Settings" },
            { name: "site-options", label: "Site-wide Options" },
          ],
          inputs: [
            // plugin
            // enablePlugin
            {
              name: "enablePlugin",
              label: `Enable ${pluginName().toUpperCase()}`,
              type: "toggle",
              value: cfg.enablePlugin,
              group: "plugin",
              help: {
                label: "?",
                text: `<p>Disabling this option will completely disable the plugin's features, but it will not remove the plugin from the site.  The settings button will stay in place so you can access this menu to re-enable the plugin.</p>
                <p>In order to complete disable the plugin, you must disable it from your browser extension. (eg: TamperMonkey, GreaseMonkey)</p>`,
              },
            },
            // enableUpdateChecks & updateCheckFrequency
            {
              name: "enableUpdateChecks",
              label: "Get Notified About Plugin Updates",
              type: "toggle",
              value: cfg.enableUpdateChecks,
              group: "plugin",
              help: {
                label: "?",
                text: `<p>Enabling this option will allow MAEJOK-TOOLS to alert you when new plugin updates become available.</p>`,
              },
              config: {
                title: "Update Check Frequency",
                options: [
                  {
                    type: "number",
                    valid: "number",
                    label: "Frequency",
                    name: "updateCheckFrequency",
                    help: {
                      label: "?",
                      title: "Plugin Update Check Frequency",
                      text: `<p>How many minutes between checking for new versions?</p>
                        <p><i>Minimum: 5</i></p>`,
                    },
                  },
                ],
              },
            },
            {
              name: "updateCheckFrequency",
              type: "hidden",
              value: cfg.updateCheckFrequency,
              group: "plugin",
            },
            // site-options
            // enableBigScreen
            {
              name: "enableBigScreen",
              label: "Enable Big Screen Mode",
              type: "toggle",
              value: cfg.enableBigScreen,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a keyboard shortcut to toggle <strong>Big Screen Mode</strong> which makes the videos take priority in the layout.</p>
                <p>Keyboard Shortcut: <strong>CTRL+\`</strong> (tilda, above TAB key)</p>
                <p>or using <strong>CTRL+SHIFT+SPACE BAR</strong>.</p>`,
              },
            },
            // persistBigScreen
            {
              name: "persistBigScreen",
              label: "Persist Big Screen",
              type: "toggle",
              value: cfg.persistBigScreen,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will restore the last <strong>Big Screen Mode</strong> state upon refreshing the site.</p>`,
              },
            },
            // enableDimMode
            {
              name: "enableDimMode",
              label: "Enable Dim mode",
              type: "toggle",
              value: cfg.enableDimMode,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option reduces the brightness of the site</p>`,
              },
            },
            // enableEmotesMenu
            {
              name: "enableEmotesMenu",
              label: "Enable Emotes Menu",
              type: "toggle",
              value: cfg.enableEmotesMenu,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a menu option to open with an option to view all chat emote commands by right-clicking in the chat input box.</p>
                <p>Right-clicking again without moving the mouse will give you access to your browser's regular context menu.</p>`,
              },
            },
            // enableChatMenu
            {
              name: "enableChatMenu",
              label: "Enable Chat Menu",
              type: "toggle",
              value: cfg.enableChatMenu,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a menu option quickly access user actions by right-clicking a user in chat.</p>
                <p>Right-clicking a mention will give options related to the mentioned user.</p>
                <p><i>Note: Right-clicking again without moving the mouse will give you access to your browser's regular context menu.</i></p>`,
              },
            },
            // disableSoundEffects
            {
              name: "disableSoundEffects",
              label: "Disable Sound Effects",
              type: "toggle",
              value: cfg.disableSoundEffects,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will disable sound effects.  This includes mentions, global missions, episode hover static, etc.</p>`,
              },
            },
            // hideGlobalMissions
            {
              name: "hideGlobalMissions",
              label: "Hide Global Mission Popups",
              type: "toggle",
              value: cfg.hideGlobalMissions,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Global Missions</strong> pop up from showing, however, you will still hear the sound effect.</p>`,
              },
            },
            // hideScreenTakeovers
            {
              name: "hideScreenTakeovers",
              label: "Hide Screen Takeovers",
              type: "toggle",
              value: cfg.hideScreenTakeovers,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Screen Takeovers</strong> (Cigarette Deliveries, Loot Crates, etc.) from showing, however, you will still hear the sound effect.</p>`,
              },
            },
            // hideScanLines
            {
              name: "hideScanLines",
              label: "Hide Scan Lines Effect",
              type: "toggle",
              value: cfg.hideScanLines,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option hide the <strong>Scan Line Effect</strong> seen across the site.</p>`,
              },
            },
          ],
        },
      },

      // --- CHAT
      {
        name: "chat",
        label: "Chat",
        content: {
          groups: [
            { name: "hiders", label: "Hiders" },
            { name: "chat-misc", label: "Miscellaneous" },
          ],
          inputs: [
            // --- GROUP - HIDERS

            // hideTimestamps
            {
              name: "hideTimestamps",
              label: "Hide Timestamps",
              type: "toggle",
              value: cfg.hideTimestamps,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideAvatars
            {
              name: "hideAvatars",
              label: "Hide Avatars",
              type: "toggle",
              value: cfg.hideAvatars,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideClans
            {
              name: "hideClans",
              label: "Hide Clans",
              type: "toggle",
              value: cfg.hideClans,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideLevels
            {
              name: "hideLevels",
              label: "Hide Levels",
              type: "toggle",
              value: cfg.hideLevels,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideEndorsements
            {
              name: "hideEndorsements",
              label: "Hide Endorsements",
              type: "toggle",
              value: cfg.hideEndorsements,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideEmotes
            {
              name: "hideEmotes",
              label: "Hide Emotes",
              type: "toggle",
              value: cfg.hideEmotes,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>Emotes</strong> in chat.</p>`,
              },
            },
            // hideRoll
            {
              name: "hideDiceRolling",
              label: "Hide Dice Rolling",
              type: "toggle",
              value: cfg.hideDiceRolling,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide <strong>Dice Rolling</strong> in chat.</p>`,
              },
            },
            // hideConsumables
            {
              name: "hideConsumables",
              label: "Hide Consumable Messages",
              type: "toggle",
              value: cfg.hideConsumables,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide the <strong>Consume Messages</strong> created by users using inventory items.</p>`,
              },
            },
            // hideClanMessages
            {
              name: "hideClanMessages",
              label: "Hide Clan Messages",
              type: "toggle",
              value: cfg.hideClanMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>Clan Messages</strong> created by a clan being created or clan alliances being proposed/formed, etc.</p>`,
              },
            },
            // hideTTSMessages
            {
              name: "hideTTSMessages",
              label: "Hide TTS Messages",
              type: "toggle",
              value: cfg.hideTTSMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>TTS Messages</strong> from chat.</p>`,
              },
            },
            // hideSFXMessages
            {
              name: "hideSFXMessages",
              label: "Hide SFX Messages",
              type: "toggle",
              value: cfg.hideSFXMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>SFX Messages</strong> from chat.</p>`,
              },
            },
            // hideSystem
            {
              name: "hideSystem",
              label: "Hide System Messages",
              type: "toggle",
              value: cfg.hideSystem,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>System Messages</strong>.</p>
                <p>These are the green messages.  eg: "Joined Global".</p>`,
              },
            },

            // --- GROUP - MISC

            // enableDenseChat
            {
              name: "enableDenseChat",
              label: "Enable Dense Chat",
              type: "toggle",
              value: cfg.enableDenseChat,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes the gap between chat messages smaller.</p>`,
              },
            },
            // enableRecentChatters / Chatter Threshold
            {
              name: "enableRecentChatters",
              label: "Enable Recent Chatters Count",
              type: "toggle",
              value: cfg.enableRecentChatters,
              group: "chat-misc",
              help: {
                label: "?",
                title: "Recent Chatters",
                text: `<p>Enabling this option creates an <strong>Active User Counter</strong> and <strong>List</strong>.</p>
                <p>Click the <strong>Chatter</strong> count to view users sorted by most recently seen.</p>
                <p><i>Note: Fish and Staff are always listed first.</i></p>`,
              },
              config: {
                title: "Recent Chatters Options",
                options: [
                  {
                    type: "number",
                    valid: "number",
                    label: "Threshold",
                    name: "recentChattersThreshold",
                    help: {
                      label: "?",
                      title: "Recent Chatters Threshold",
                      text: "How long since a user's last message before considering them no longer active and removing them from the chatters list.<br>Note: Setting this to 0 will store ALL users until you refresh.",
                    },
                  },
                ],
              },
            },
            {
              name: "recentChattersThreshold",
              type: "hidden",
              value: cfg.recentChattersThreshold,
              group: "chat-misc",
            },
            // autoClanChat
            {
              name: "autoClanChat",
              label: "Enter Clan Chat Automatically",
              type: "toggle",
              value: cfg.autoClanChat,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will put you into your clan chat immediately upon loading the site.</p>`,
              },
            },
            // enableImprovedTagging
            {
              name: "enableImprovedTagging",
              label: "Improve mention functionality",
              type: "toggle",
              value: cfg.enableImprovedTagging,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will add <strong>Avatar-click Tagging</strong>, as well as improve the way mentions are added to the input box by adding spaces before and after the mention where needed.</p>`,
              },
            },
            // enableEmojis
            {
              name: "enableEmojis",
              label: "Enable emojis",
              type: "toggle",
              value: cfg.enableEmojis,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will replace some text emoticons with their closest emoji counterpart. e.g. :) -> 🙂</p>`,
              },
            },
            // normalizeEpicText
            {
              name: "normalizeEpicText",
              label: "Normalize Epic Text",
              type: "toggle",
              value: cfg.normalizeEpicText,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes <strong>Gold "Epic" Messages</strong> look like all the other messages in chat.<p>`,
              },
            },
            // normalizeGrandText
            {
              name: "normalizeGrandText",
              label: "Normalize Grand Text",
              type: "toggle",
              value: cfg.normalizeGrandText,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes <strong>Red "Grand" Messages</strong> look like all the other messages in chat.<p>`,
              },
            },
            // fixDarkDisplayNames
            {
              name: "fixDarkDisplayNames",
              label: "Fix Dark Display Names",
              type: "toggle",
              value: cfg.fixDarkDisplayNames,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes Dark Display Names a little brighter and easier to read.<p>`,
              },
            },
          ],
        },
      },

      // --- HIGHLIGHTING
      {
        name: "highlighting",
        label: "Highlighting",
        content: {
          groups: [
            { name: "friends", label: "Friends" },
            { name: "watching", label: "Watched Users" },
          ],
          inputs: [
            // friends
            {
              name: "friendsColor",
              label: "Friends Color",
              type: "color-picker",
              value: cfg.friendsColor,
              group: "friends",
              help: { label: "?", text: "timestamp help text" },
            },
            // watching
            {
              name: "watchingColor",
              label: "Watching Color",
              type: "color-picker",
              value: cfg.watchingColor,
              group: "watching",
              help: { label: "?", text: "timestamp help text" },
            },
          ],
        },
      },

      // --- MENTION LOG
      {
        name: "mentionLog",
        label: "Mentions",
        content: {
          groups: [{ name: "mentions", label: "Mentions Log" }],
          inputs: [
            // mentions
            // enableMentionLog
            {
              name: "enableMentionLog",
              label: "Enable Mention Logging",
              type: "toggle",
              value: cfg.enableMentionLog,
              group: "mentions",
              help: {
                label: "?",
                text: `<p>Enabling this option will temporarily store all messages you were mentioned in.</p>
                <p>This log WILL clear every time you refresh or close the page.</p>`,
              },
            },
            // reverseMentionLog
            {
              name: "reverseMentionLog",
              label: "Show Newest First",
              type: "toggle",
              value: cfg.reverseMentionLog,
              group: "mentions",
              help: {
                label: "?",
                text: `<p>Enabling this option set the mentions log to list in order of newest to oldest.</p><p>After toggling this option, you must close and reopen the settings window to see the changes.</p>`,
              },
            },
            // mentionsLog
            {
              name: "mentionsLog",
              label: "Mentions Log",
              type: "mentions-log",
              value: state.get("mentions"),
              group: "mentions",
            },
          ],
        },
      },

      // --- KEYBINDS
      {
        name: "keyBinds",
        label: "Keybinds",
        content: {
          groups: [
            { name: "bindoptions", label: "Bind Options" },
            { name: "roombinds", label: "Key Binds" },
          ],
          inputs: [
            // bindoptions
            // bindsEnable
            {
              name: "bindsEnable",
              label: "Enable Key Binds",
              type: "toggle",
              value: cfg.bindsEnable,
              group: "bindoptions",
              help: {
                label: "?",
                text: `<p>Enabling this option will allow binds to be used.</p>`,
              },
            },
            // bindsForceCtrl
            {
              name: "bindsForceCtrl",
              label: "Force Ctrl Requirement",
              type: "toggle",
              value: cfg.bindsForceCtrl,
              group: "bindoptions",
              help: {
                label: "?",
                text: `<p>If enabled, all keybinds will require the CTRL key to be held.</p>`,
              },
            },
            // bindsReset
            {
              name: "bindsReset",
              label: "Restore Default Binds",
              type: "button",
              group: "bindoptions",
              onclick: clickResetKeybindButton,
              color: "red",
              help: {
                label: "?",
                text: `<p>Resets all keybinds to their default values.</p>`,
              },
            },
            // roombinds
            // toggleAuto
            {
              name: "toggleAuto",
              label: "Toggle Auto Mode",
              type: "keybind",
              value: "toggle-auto",
              group: "roombinds",
            },
            // toggleHQ
            {
              name: "toggleHQ",
              label: "Toggle HQ Mode",
              type: "keybind",
              value: "toggle-hq",
              group: "roombinds",
            },
            // enterFullscreen
            {
              name: "enterFullscreen",
              label: "Enter Native Fullscreen",
              type: "keybind",
              value: "enter-native-fs",
              group: "roombinds",
            },
            // closeStream
            {
              name: "closeStream",
              label: "Return to Room Grid",
              type: "keybind",
              value: "close-stream",
              group: "roombinds",
            },
            // switchBedroom1
            {
              name: "switchBedroom1",
              label: "Bedroom 1",
              type: "keybind",
              value: "bedroom-1",
              group: "roombinds",
            },
            // switchBedroom2
            {
              name: "switchBedroom2",
              label: "Bedroom 2",
              type: "keybind",
              value: "bedroom-2",
              group: "roombinds",
            },
            // switchBedroom3
            {
              name: "switchBedroom3",
              label: "Bedroom 3",
              type: "keybind",
              value: "bedroom-3",
              group: "roombinds",
            },
            // switchBunk
            {
              name: "switchBunk",
              label: "The Bunk",
              type: "keybind",
              value: "the-bunk",
              group: "roombinds",
            },
            // switchHallwayUpstairs
            {
              name: "switchHallwayUpstairs",
              label: "Hallway - Upstairs",
              type: "keybind",
              value: "hallway-upstairs",
              group: "roombinds",
            },
            // switchHallwayDownstairs
            {
              name: "switchHallwayDownstairs",
              label: "Hallway - Downstairs",
              type: "keybind",
              value: "hallway-downstairs",
              group: "roombinds",
            },
            // switchLivingRoom
            {
              name: "switchLivingRoom",
              label: "Living Room",
              type: "keybind",
              value: "living-room",
              group: "roombinds",
            },
            // switchLounge
            {
              name: "switchLounge",
              label: "Lounge",
              type: "keybind",
              value: "lounge",
              group: "roombinds",
            },
            // switchBar
            {
              name: "switchBar",
              label: "Bar",
              type: "keybind",
              value: "bar",
              group: "roombinds",
            },
            // switchKitchen
            {
              name: "switchKitchen",
              label: "Kitchen",
              type: "keybind",
              value: "kitchen",
              group: "roombinds",
            },
            // switchDogHouse
            {
              name: "switchDogHouse",
              label: "Dog House",
              type: "keybind",
              value: "dog-house",
              group: "roombinds",
            },
            // switchAttic
            {
              name: "switchAttic",
              label: "Attic",
              type: "keybind",
              value: "attic",
              group: "roombinds",
            },
            // switchBathroomUpstairs
            {
              name: "switchBathroomUpstairs",
              label: "Bathroom - Upstairs",
              type: "keybind",
              value: "upstairs-bathroom",
              group: "roombinds",
            },
            // switchBathroomDownstairs
            {
              name: "switchBathroomDownstairs",
              label: "Bathroom - Downstairs",
              type: "keybind",
              value: "downstairs-bathroom",
              group: "roombinds",
            },
            // switchBathroomMaster
            {
              name: "switchBathroomMaster",
              label: "Bathroom - Master",
              type: "keybind",
              value: "master-bathroom",
              group: "roombinds",
            },
            // switchConfessional
            {
              name: "switchConfessional",
              label: "Confessional",
              type: "keybind",
              value: "confessional",
              group: "roombinds",
            },
          ],
        },
      },

      // --- ABOUT
      {
        name: "about",
        label: "About",
        content: {
          groups: [{ name: "about", label: "About This Plugin" }],
        },
      },
    ];

    return settingsConfig;
  };

  const plugin = (key) => {
    if (!key) {
      return pluginObj;
    }
    return pluginObj[key];
  };

  const get = (key) => {
    if (!key) {
      return configObj;
    }
    return configObj[key];
  };

  const set = (key, value) => {
    if (configObj.hasOwnProperty(key)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        configObj[key] = { ...configObj[key], ...value };
      } else {
        configObj[key] = value;
      }
    }
  };

  const load = () => {
    const storedSettings = JSON.parse(
      localStorage.getItem(pluginObj.storageKey)
    );
    if (!storedSettings) {
      save();
      return configObj;
    }
    for (const key in storedSettings) {
      if (configObj.hasOwnProperty(key)) {
        configObj[key] = storedSettings[key];
      }
    }
    return configObj;
  };

  const save = async () => {
    const storedSettings = {};
    for (const key in configObj) {
      if (configObj.hasOwnProperty(key)) {
        storedSettings[key] = configObj[key];
      }
    }
    try {
      localStorage.setItem(
        pluginObj.storageKey,
        JSON.stringify(storedSettings)
      );
    } catch {
      console.error("Error while saving localstorage");
    } finally {
      return storedSettings;
    }
  };

  return { plugin, get, set, load, save, settingsOptions };
};

export default Config();
