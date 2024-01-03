// STATE MANAGEMENT
const State = () => {
  const defaults = {
    loaded: false,
    isPopoutChat: false,
    modals: [],
    user: null,
    bigChatState: false,
    mentions: [],
    recentChatters: [],
    observers: {
      chat: null,
      user: null,
    },
    menu: null,
    prevMousePos: { x: 0, y: 0 },
    contextUser: null,
    recentChattersInterval: null,
    updateCheckInterval: null,
    daysLeftInterval: null,
    running: false,
    packageJson: {},
    updateShown: false,
    audioElement: false,
  };

  const get = (key) => {
    if (!key) {
      return defaults;
    }
    return defaults[key];
  };

  const set = (key, value) => {
    if (defaults.hasOwnProperty(key)) {
      if (value === null || value === undefined) {
        defaults[key] = null;
      } else if (typeof value === "object" && !Array.isArray(value)) {
        defaults[key] = { ...defaults[key], ...value };
      } else {
        defaults[key] = value;
      }
    }
  };

  return { get, set };
};

export default State();
