import { REPO_RAW_ROOT } from "../modules/constants";

const Elements = {
  login: {
    selector: `[class^="log-in_log-in__"]`,
    class: "log-in_log-in__1Bbqa",
  },
  archive: {
    selector: `[class^="archive_archive"]`,
    class: `archive_archive__wsFNf`,
  },
  home: {
    selector: `[class^="home_home"]`,
    class: "home_home__pUFCA",
  },
  header: {
    selector: `[class*="top-bar_top-bar__"]`,
    class: "top-bar_top-bar___Z0QX",
    user: {
      selector: `[class^="top-bar_user"]`,
      class: `top-bar_user__J28x0`,
      name: {
        selector: `[class^="top-bar_display-name"]`,
        class: `top-bar_display-name__TM9I3`,
      },
      clan: {
        selector: `[class^="top-bar_clan_"]`,
        class: `top-bar_clan__qikGL`,
      },
      level: {
        selector: `[class^="top-bar_xp"]`,
        class: `top-bar_xp__WP8hN`,
      },
      tokens: {
        selector: `[class^="top-bar_tokens"]`,
        class: `top-bar_tokens__C71wC`,
      },
    },
    title: {
      selector: `[class^="top-bar_title__"]`,
      class: "top-bar_title__DJbDC",
      admin: {
        selector: `[class^="admin-toolbar_admin-toolbar__"]`,
        class: "admin-toolbar_admin-toolbar__Jlc17",
      },
      logo: {
        selector: `[class^="top-bar_logo__"]`,
        class: "top-bar_logo__XL0_C",
      },
      links: {
        selector: `[class^="top-bar-links_top-bar-links__70nuu"]`,
        class: "top-bar-links_top-bar-links__70nuu",
      },
    },
  },
  profile: {
    selector: `[class^="profile-modal_profile-modal"]`,
    class: "profile-modal_profile-modal__4mjE7",
    actions: {
      selector: `[class^="user-profile_actions]`,
      class: "profile_actions__9KG8x",
      mute: {
        selector: `[class^="user-profile_actions"] button:nth-child(1)`,
      },
    },
    clanInvite: {
      selector: `[class*="top-bar_clan-invite__"]`,
      class: "top-bar_clan-invite__Gv9N_",
    },
  },
  stats: {
    selector: `[class^="stats_value__"]`,
    class: "stats_value__tX5K4",
    day: {
      selector1: `#__next > main > div.secondary-panel_secondary-panel__vUc65 > div.secondary-panel_stats-large__nd7E8 > div > div.stats_body__q3DS7 > div:nth-child(1) > div.stats_value__tX5K4`,
      selector2: `#__next > main > div.stats_stats__SIg_t > div.stats_body__q3DS7 > div:nth-child(1) > div.stats_value__tX5K4`,
      label: {
        selector1: `#__next > main > div.stats_stats__SIg_t > div.stats_body__q3DS7 > div:nth-child(1) > div.stats_label___aXQq`,
        selector2: `#__next > main > div.secondary-panel_secondary-panel__vUc65 > div.secondary-panel_stats-large__nd7E8 > div > div.stats_body__q3DS7 > div:nth-child(1) > div.stats_label___aXQq`,
      },
    },
  },
  countdown: {
    selector: `[class^="countdown_countdown"]`,
    class: `countdown_countdown__eQUUu`,
  },
  chat: {
    main: {
      selector: `[class^="chat_chat"]`,
      classes: [`chat_chat__2rdNg`, `chat_selected__nnAlf`],
    },
    header: {
      selector: `[class^="chat_header__"]`,
      class: "chat_header__8kNPS",
      presence: {
        selector: `[class^="chat_presence__"]`,
        class: "chat_presence__90XuO",
        count: {
          selector: `[class^="chat_count__"]`,
          class: "chat_count__D7xic",
        },
      },
      recent: {
        selector: `[class*="maejok-chatters_presence"]`,
        class: "maejok-chatters_presence",
        count: {
          selector: `[class*="maejok-chatters_count"]`,
          class: "maejok-chatters_count",
        },
        menu: {
          class: "maejok-chatters-menu",
          item: {
            class: "maejok-chatters-menu_item",
          },
        },
      },
    },
    list: {
      selector: `[class^="chat_inner"]`,
      class: `chat_inner__cymIB`,
    },
    room: {
      selector: `[class^="chat-room-selector_chat-room-selector__"]`,
      class: "chat-room-selector_chat-room-selector__PayQH",
      options: {
        selector: `[class^="select_options__"]`,
        class: `select_options__t1ibN`,
      },
    },
    message: {
      selector: `[class*="chat-message-default_chat"]`,
      class: `chat-message-default_chat-message-default__JtJQL`,
      wes: {
        selector: `[class*="chat-message-default_wes__"]`,
        class: "chat-message-default_wes__EupNC",
      },
      fish: {
        selector: `[class*="chat-message-default_fish__"]`,
        class: "chat-message-default_fish__9hxl_",
      },
      admin: {
        selector: `[class*="chat-message-default_admin__"]`,
        class: "chat-message-default_admin__soVcy",
      },
      epic: {
        selector: `[class*="chat-message-default_epic__"]`,
        class: "chat-message-default_epic__h5F2K",
        normalize: {
          class: "maejok-normalize-message",
        },
      },
      grand: {
        selector: `[class*="chat-message-default_grand__"]`,
        class: "chat-message-default_grand__Jf2Eh",
        normalize: {
          class: "maejok-normalize-message",
        },
      },
      hide: {
        selector: `[class^="maejok-hide"]`,
        class: `maejok-hide`,
      },
      avatar: {
        selector: `[class^="chat-message-default_avatar"] img`,
        class: `chat-message-default_avatar__eVmdi`,
        container: {
          selector: `[class^="chat-message-default_avatar"]`,
          class: `chat-message-default_avatar__eVmdi`,
        },
        image: { selector: `[class^="chat-message-default_avatar"] img` },
      },
      level: {
        selector: `[class^="chat-message-default_lvl"]`,
        class: `chat-message-default_lvl__QXf_z`,
      },
      clan: {
        selector: `[class^="chat-message-default_clan"]`,
        class: `chat-message-default_clan__t_Ggo`,
      },
      sender: {
        selector: `[class^="chat-message-default_user"]`,
        class: `chat-message-default_user__uVNvH`,
      },
      body: {
        selector: `[class^="chat-message-default_body"]`,
        class: `chat-message-default_body__iFlH4`,
        text: {
          selector: `[class^="chat-message-default_message"]`,
          class: `chat-message-default_message__milmT`,
        },
      },
      timestamp: {
        selector: `[class^="chat-message-default_timestamp"]`,
        class: `chat-message-default_timestamp__sGwZy`,
      },
      mention: {
        selector: `[class^="chat-message-default_mention"]`,
        class: `chat-message-default_mention__Ieq18`,
      },
      mentioned: {
        selector: `[class*="chat-message-default_mentioned"]`,
        class: `chat-message-default_mentioned__EDIeq`,
      },
    },
    emote: {
      selector: `[class^="chat-message-emote_chat"]`,
      class: `chat-message-emote_chat-message-emote__NWoZG`,
      sender: {
        selector: `[class^="chat-message-emote_user"]`,
        class: `chat-message-emote_user__faZE7`,
      },
      body: {
        selector: `[class^="chat-message-emote_message"]`,
        class: `chat-message-emote_message__HE0id`,
      },
    },
    consumable: {
      selector: `[class^="chat-message-happening_chat"]`,
      class: `chat-message-happening_chat-message-happening__tYeDU`,
      sender: {
        selector: `[class^="chat-message-happening_user"]`,
        class: `chat-message-happening_user__c_Ohh`,
      },
      body: {
        selector: `[class^="chat-message-happening_message"]`,
        class: `chat-message-happening_message__W13K6`,
      },
    },
    clan: {
      selector: `[class^="chat-message-clan_chat"]`,
      class: `chat-message-clan_chat-message-clan__kS1Cp`,
    },
    system: {
      selector: `[class^="chat-message-system_chat"]`,
      class: `chat-message-system_chat-message-system__qZ_cD`,
      body: {
        selector: `[class^="chat-message-system_chat"] div div`,
        class: `chat-message-system_chat-message-system__qZ_cD`,
      },
    },
    scroll: {
      selector: `[class^="chat_scroll"]`,
      class: `chat_scroll__6Tqdf`,
    },
    input: {
      selector: `[id="chat-input"]`,
      class: `chat-input_input__ozkas`,
      id: `chat-input`,
      form: {
        selector: `[class^="chat-input_chat-input__"]`,
        class: "chat-input_chat-input__OmyQV",
      },
      placeholder: {
        selector: `[class^="chat-input_placeholder"]`,
        class: `chat-input_placeholder__LVY_6 `,
      },
      actions: {
        selector: `[class^="chat-input_actions"]`,
        class: `chat-input_actions__V_ho0`,
        medals: {
          selector: `[class^="medal-selector_medal-selector__"]`,
          class: "medal-selector_medal-selector___1oot",
        },
      },
    },
  },
  experience: {
    selector: `[class^="experience-bar_experience-bar__"]`,
    class: "experience-bar_experience-bar__nVDge",
  },
  menu: {
    selector: `[class^="maejok-menu-menu"]`,
    class: "maejok-menu-menu",
    item: {
      selector: `[class^="maejok-menu-menu_item"]`,
      class: "maejok-menu-menu_item",
    },
    noItems: {
      selector: `[class^="maejok-menu-menu_no-items"]`,
      class: "maejok-menu-menu_no-items",
    },
    title: {
      selector: `[class^="maejok-menu-menu_title"]`,
      class: "maejok-menu-menu_title",
    },
  },
  modal: {
    selector: `[class^="modal_modal"]`,
    class: "modal_modal__MS70U",
    confirm: {
      selector: `[class^="confirm-modal_confirm-modal"] button:nth-child(1)`,
      class: "confirm-modal_confirm-modal__pxBa_",
    },
    container: {
      selector: `[class^="modal_modal-container"]`,
      class: "modal_modal-container__iQODa",
    },
    backdrop: {
      selector: `[class^="modal_backdrop"]`,
      class: "modal_backdrop__94Bu6",
    },
    header: {
      selector: `[class^="modal_header"]`,
      class: "modal_header__O0ebJ",
    },
    close: {
      selector: `[class^="modal_close"]`,
      class: "modal_close__E9CBl",
      button: {
        selector: `[class^="close-button"]`,
        classes: ["close-button_close-button__BKUKA", "close-button_sm__n0dZT"],
        image: {
          selector: `[class=^"close-button"] img`,
          attr: ["src", "https://cdn.fishtank.live/images/slices/close.png"],
        },
      },
    },
    title: {
      selector: `[class^="modal_title"]`,
      class: [`modal_title__TdXFC`],
      text: { selector: `[class^="modal_title"] h2` },
    },
    body: {
      selector: `[class^="modal_body"]`,
      class: [`modal_body__j3Bav`],
    },
    screws: {
      selector: `[class^="screws_screws"]`,
      class: `screws_screws__letgM`,
      top: {
        left: {
          classes: [`screws_screw__t_1iY`, `screws_top-left__8K2_Q`],
        },
        right: {
          selector: `[class*="screws_top-right"]`,
          classes: [`screws_screw__t_1iY`, `screws_top-right__kdqNC`],
        },
      },
      bottom: {
        left: {
          classes: [`screws_screw__t_1iY`, `screws_bottom-left__Kz1OJ`],
        },
        right: {
          classes: [`screws_screw__t_1iY`, `screws_bottom-right__ebrGH`],
        },
      },
    },
  },
  settings: {
    selector: `[class^="maejok-modal-modal"]`,
    class: [`maejok-modal-modal`],
    body: {
      selector: `[class^="maejok-modal-body"]`,
      class: [`maejok-modal-body`],
    },
    opener: {
      selector: `[class^="maejok-settings-opener"]`,
      class: [`maejok-settings-opener`],
      button: {
        classes: [
          `console-button-square_console-button-square__GpSZQ`,
          `console-button-square_md__OiTX7`,
        ],
        square: { class: [`console-button-square_text__IfVyC`] },
        icon: { class: [`icon_icon__bDzMA`] },
        image: {
          attr: [
            `src`,
            `${REPO_RAW_ROOT}/public/images/console-button-square-purple.png`,
          ],
        },
      },
    },
    tabs: {
      bar: {
        selector: `[class^="maejok-settings_tab-bar"]`,
        class: [`maejok-settings_tab-bar`],
      },
      tab: {
        selector: `[class^="maejok-tab-button"]`,
        class: [`maejok-tab-button`],
      },
      panel: {
        selector: `[class^="maejok-settings_tab-panel"]`,
        class: [`maejok-settings_tab-panel`],
      },
      button: {
        selector: `[class^="maejok-settings_body"]`,
        classes: [
          `maejok-tab-button`,
          `console-button-long_console-button-long__G6irT`,
          `console-button-long_md__y_aAD`,
        ],
        image: {
          attr: [`loading`, `lazy`, `decoding`, `async`, `data-nimg`, `1`],
          src: `https://cdn.fishtank.live/images/slices/console-button-long-orange.png`,
        },
        text: {
          class: ["console-button-long_text__ajAjy"],
        },
      },
    },
    accordion: {
      active: {
        selector: `[class^="maejok-accordion-active"]`,
        class: [`maejok-accordion-active`],
      },
      content: {
        selector: `[class^="maejok-accordion-content"]`,
        class: [`maejok-accordion-content`],
        highlights: {
          class: "maejok-accordion-highlights",
          example: { class: "maejok-accordion-highlights-message_example" },
        },
      },
      header: {
        selector: `[class^="maejok-accordion-header"]`,
        class: [`maejok-accordion-header`],
      },
    },
    mentions: {
      class: "maejok-settings_mentions-list",
      item: {
        class: "maejok-settings_mentions-list-item",
        remove: {
          class: "maejok-settings_mentions-list-item-remove",
        },
      },
    },
    config: {
      wrapper: { class: "maejok-settings-config-wrapper" },
      group: { class: "maejok-settings-config-input-group" },
      help: {
        class: "maejok-settings-config-help",
      },
    },
  },
  emotes: {
    selector: `[class^="maejok-modal-emotes"]`,
    class: "maejok-modal-emotes",
    list: {
      selector: `[class^="maejok-emotes-list"]`,
      class: "maejok-emotes-list",
      item: {
        selector: `[class^="maejok-emotes-list_item"]`,
        class: "maejok-emotes-list_item",
        command: {
          selector: `[class^="maejok-emotes-list_item_command"]`,
          class: "maejok-emotes-list_item_command",
          demote: {
            class: "maejok-emotes-list_item_command_demote",
          },
        },
        emote: {
          selector: `[class^="maejok-emotes-list_item_emote"]`,
          class: "maejok-emotes-list_item_emote",
        },
        use: {
          selector: `[class^="maejok-emotes-list_item_use"]`,
          class: "maejok-emotes-list_item_use",
        },
      },
    },
  },
  inputs: {
    group: { class: [`maejok-input-group`] },
    label: { class: [`maejok-input-label`] },
    toggle: {
      class: [`maejok-input-toggle`],
      label: {
        class: [`maejok-input-toggle-label`],
        checked: { class: [`maejok-input-label-checked`] },
      },
    },
    help: {
      label: {
        help: { class: [`maejok-input-help-label`] },
        config: { class: [`maejok-input-help-config-label`] },
      },
      text: { class: [`maejok-input-help-text`] },
    },
    buttons: {
      classes: [
        `maejok-input-button`,
        `console-button-long_console-button-long__G6irT`,
        `console-button-long_lg__hdQwz`,
      ],
      wrapper: { class: [`maejok-input-button-wrapper`] },
      label: { class: [`console-button-long_text__ajAjy`] },
      save: { class: [`maejok-input-button-save`] },
    },
    textbox: {
      class: "maejok-input-textbox",
      label: { class: "maejok-input-label-textbox" },
    },
    invalid: {
      class: "maejok-input-invalid",
    },
    colorPicker: {
      wrapper: { class: "maejok-color-picker-wrapper" },
      group: { class: "maejok-color-picker-group" },
      label: { class: "maejok-color-picker-label" },
    },
    list: {
      wrapper: { class: "maejok-list-wrapper" },
      item: {
        class: "maejok-list-item",
        wrapper: { class: "maejok-list-item-wrapper" },
        remove: { class: "maejok-list-item-remove" },
      },
      empty: {
        class: "maejok-list-empty",
      },
    },
  },
};

export default Elements;
