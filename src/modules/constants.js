export const VERSION = process.env.VERSION;

export const REPO_RAW_ROOT = process.env.REPO.raw;
export const REPO_URL_ROOT = process.env.REPO.url;
export const PACKAGE_URL = `${REPO_RAW_ROOT}/package.json`;

export const ONE_MINUTE = 60 * 1000;
export const TEN_MINUTES = ONE_MINUTE * 10;

export const SOUNDS = new Map([
  //long
  ["doom", "mp3"],
  ["vomit", "mp3"],
  ["romantic", "mp3"],
  ["massacre", "mp3"],
  ["breakup", "mp3"],
  ["fart", "mp3"],
  ["raid", "mp3"],
  //short
  ["equip", "mp3"],
  ["granted", "mp3"],
  ["denied", "mp3"],
  ["chunk-short", "mp3"],
  ["blip", "mp3"],
  ["book", "mp3"],
  ["chaching", "mp3"],
  ["tube", "mp3"],
  ["dice", "mp3"],
  ["coin", "mp3"],
  ["nuke-1", "mp3"],
  ["nuke-2", "mp3"],
  ["nuke-3", "mp3"],
  ["nuke-4", "mp3"],
  ["nuke-5", "mp3"],
  ["xp", "mp3"],
  ["level", "mp3"],
  ["mention", "mp3"],
  ["yes", "mp3"],
  ["global-mission-3", "mp3"],
  ["click-high-short", "mp3"],
  ["click-low-short", "mp3"],
  ["click-harsh-short", "wav"],
  ["latch-short", "wav"],
  ["swap-short", "wav"],
  ["shutter", "wav"],
  ["complete", "wav"],
  ["xp-down", "wav"],
  ["power", "wav"],
  ["daily", "wav"],
  ["item-found", "wav"],
  ["item-consumed", "wav"],
  ["panic", "wav"],
  ["poll", "wav"],
  ["tick-short", "wav"],
]);

export const DARK_MODE_STYLES = `
.background_background__fNMDL {
  background: #1c1c1c;
  background-image: none;
}

.live-stream_live-stream__uVezO,
.live-stream-fullscreen_left__idsvZ,
.live-stream-fullscreen_right___UCNg,
.episode-fullscreen_left__bNbXb,
.episode-fullscreen_right__HuAn9,
.top-bar_top-bar___Z0QX,
.stats_stats__SIg_t,
.tts-history_tts-history__8_9eB,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.chat-input_actions__QqSJK,
.chat_header__8kNPS,
.loader_loader__iek2w,
.clans_clans__v2iO2,
.episodes_episodes__o7PWv,
.leader-board_leader-board__7KyzK,
.episode-fullscreen_bonus__scypw,
.clan-info_clan-info___2J6Z,
#contestants {
  filter: brightness(0.5) !important;
}

.episode_episode__oA49f {
  filter: brightness(0.7);
}

.live-stream_popular__hfeZD {
  filter: drop-shadow(0 0 8px rgba(255,29,0,.75)) brightness(0.8) !important;
}

.modal_backdrop__94Bu6 {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.modal_modal-container__iQODa .modal_modal__MS70U:before {
  filter: brightness(0.25);
}

#live-stream-player, #episode-player {
  border: none;
  box-shadow: none;
  outline-color: rgb(129 129 129);
}

#live-stream-player:after, #episode-player:after {
  filter: brightness(0.7);
}

#live-stream-player:before, #episode-player:before {
  filter: brightness(0.5);
}

.chat_chat__2rdNg {
  filter: brightness(0.9);
  border: none;
  box-shadow: none;
  outline-color: rgb(129 129 129) !important;
}

.chat_chat__2rdNg .chat_messages__2IBEJ:before {
  opacity: 0 ;
}

.chat_chat__2rdNg:after,
.chat_chat__2rdNg:before {
  filter: brightness(0.5);
}

#live-stream-fullscreen {
  filter: brightness(0.25);
}

.live-stream-controls_live-stream-controls__hI4aT {
  filter: brightness(0.75);
}
`;

export const SCREEN_TAKEOVERS_STYLES = `
.happening_happening__Ca2E7,
.happening_backdrop__JCihz,
.cyber-attack_cyber-attack__hKvrm {
  display: none !important;
}
`;

export const BIG_SCREEN_STYLES_ONLINE = `
.home_home__pUFCA .home_center__6GW_l {
  grid-column: 1/4;
  grid-row: 1/6;
}

#main-panel {
  margin-right: 3px;
}

.live-streams_live-streams__BYV96 {
  padding: 0 10px;
}

.top-bar_top-bar___Z0QX,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.home_left__UiQ0z,
.home_center-bottom__zlpWm,
.home_right__j_b3u,
.tts-history_tts-history__8_9eB  {
  display: none !important;
}

.live-stream-fullscreen_live-stream-fullscreen__zpNvE {
  .live-stream-fullscreen_left__idsvZ,
  .live-stream-fullscreen_right___UCNg {
    flex: 2% 1;

    img {
      display: none;
    }
  }
}

#live-stream-player > div.live-stream-fullscreen_close__JY_lb > button {
  all: unset;
  cursor: pointer;
  text-shadow: 0px 0px 4px #000;

  &:hover {
    transform: scale(1.15);
  }

  &::before {
    unset: all;
    content: "❌";
  }

  img {
    display: none;
  }
}
`;

export const BIG_SCREEN_STYLES_OFFLINE = `
.home_home__pUFCA .home_right__j_b3u {
  grid-column: 1/4;
  grid-row: 1/6;
}

.top-bar_top-bar___Z0QX,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.home_left__UiQ0z,
.home_center-bottom__zlpWm,
.home_center__6GW_l,
.tts-history_tts-history__8_9eB  {
  display: none !important;
}
`;

export const ROOMS = {
  "living-room": {
    id: "living-room",
    name: "Living Room",
    switchTo: () => {},
  },
  lounge: {
    id: "lounge",
    name: "Lounge",
    switchTo: () => {},
  },
  bar: {
    id: "bar",
    name: "Bar",
    switchTo: () => {},
  },
  kitchen: {
    id: "kitchen",
    name: "Kitchen",
    switchTo: () => {},
  },
  "dog-house": {
    id: "dog-house",
    name: "Dog House",
    switchTo: () => {},
  },
  "hallway-downstairs": {
    id: "hallway-downstairs",
    name: "Hallway Downstairs",
    switchTo: () => {},
  },
  "hallway-upstairs": {
    id: "hallway-upstairs",
    name: "Hallway Upstairs",
    switchTo: () => {},
  },
  "bedroom-1": {
    id: "bedroom-1",
    name: "Bedroom 1",
    switchTo: () => {},
  },
  "bedroom-2": {
    id: "bedroom-2",
    name: "Bedroom 2",
    switchTo: () => {},
  },
  "the-bunk": {
    id: "the-bunk",
    name: "The Bunk",
    switchTo: () => {},
  },
  "bedroom-3": {
    id: "bedroom-3",
    name: "Bedroom 3",
    switchTo: () => {},
  },
  attic: {
    id: "attic",
    name: "Attic",
    switchTo: () => {},
  },
  "upstairs-bathroom": {
    id: "upstairs-bathroom",
    name: "Upstairs Bathroom",
    switchTo: () => {},
  },
  "downstairs-bathroom": {
    id: "downstairs-bathroom",
    name: "Downstairs Bathroom",
    switchTo: () => {},
  },
  "master-bathroom": {
    id: "master-bathroom",
    name: "Master Bathroom",
    switchTo: () => {},
  },
  confessional: {
    id: "confessional",
    name: "Confessional",
    switchTo: () => {},
  },
};

export const DEFAULT_KEYBINDS = {
  "toggle-auto": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Backquote",
  },
  "toggle-hq": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyH",
  },
  "enter-native-fs": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyF",
  },
  "close-stream": {
    ctrlKey: false,
    altKey: false,
    shiftKey: true,
    code: "Space",
  },
  "living-room": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyQ",
  },
  lounge: {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyW",
  },
  bar: {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyE",
  },
  kitchen: {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyR",
  },
  "dog-house": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyT",
  },
  "hallway-downstairs": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyY",
  },
  "hallway-upstairs": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Digit5",
  },
  "bedroom-1": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Digit1",
  },
  "bedroom-2": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Digit2",
  },
  "bedroom-3": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Digit3",
  },
  "the-bunk": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Digit4",
  },
  attic: {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "F1",
  },
  "upstairs-bathroom": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "F2",
  },
  "downstairs-bathroom": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "F3",
  },
  "master-bathroom": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "F4",
  },
  confessional: {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "F6",
  },
};

export const CLOSE_SVG = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z" fill="currentColor"></path></svg>`;
