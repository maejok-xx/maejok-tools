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
  livestreams: {
    selector: `[class*="live-streams_live-streams__"]`,
    class: "live-streams_live-streams__BYV96",
    grid: {
      selector: `[class*="live-streams_live-streams-grid__"]`,
      class: "live-streams_live-streams-grid__Tp4ah",
    },
    controls: {
      selector: `[class^="livepeer-video-player_controls"]`,
      class: "livepeer-video-player_controls__y36El",
    },
    quality: {
      selector: `[class^="livepeer-video-player_quality"]`,
      class: "livepeer-video-player_quality__1WPkz",
    },
  },
  secondaryPanel: {
    tab: {
      class: "secondary-panel_tab__PxWtZ",
      selector: `[class*="secondary-panel_tab__"]`,
    },
  },
  header: {
    selector: `[class*="top-bar_top-bar__"]`,
    class: "top-bar_top-bar___Z0QX",
    user: {
      selector: `[class^="top-bar_user"]`,
      class: `top-bar-user_top-bar-user__VUdJm`,
      name: {
        selector: `[class^="top-bar-user_display-name"]`,
        class: `top-bar-user_display-name__bzlpw`,
      },
      clan: {
        selector: `[class^="top-bar_clan_"]`,
        class: `top-bar-user_clan__M5hMP`,
      },
      level: {
        selector: `[class^="top-bar_xp"]`,
        class: `top-bar-user_xp___ttgt`,
      },
      tokens: {
        selector: `[class^="top-bar_tokens"]`,
        class: `top-bar-user_tokens__vAwEj`,
      },
    },
    admin: {
      selector: `[class^="admin-toolbar_admin-toolbar__"]`,
      class: "admin-toolbar_admin-toolbar__Jlc17",
    },
    logo: {
      selector: `[class^="top-bar_logo__"]`,
      class: "top-bar_logo__XL0_C",
      img: {
        selector: `[class^="top-bar_desktop__"]`,
        class: "top-bar_desktop__pjX2g",
      },
      hoverImg: {
        selector: ".maejok-logo_hover",
        classes: ["maejok-logo_hover", "top-bar_desktop__pjX2g"],
      },
      hideImg: {
        class: "maejok-logo_hide",
      },
    },
    links: {
      selector: `[class^="top-bar-links"]`,
      class: "top-bar_links__4FJwt",
    },
    director: {
      selector: `[class^="top-side_director__"]`,
      class: "top-side_director__nAHL_",
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
      title: {
        selector: `[class^="chat_title__"]`,
        class: "chat_title__CrfQP",
      },
      roomSelect: {
        selector: `[class^="chat-room-selector_chat-room-selector__"]`,
        class: "chat-room-selector_chat-room-selector__PayQH",
      },
      presence: {
        selector: `[class^="chat_presence__"]`,
        class: "chat_presence__90XuO",
        id: "maejok-chatters_online-presence-id",
        online: {
          selector: `[class*="maejok-chatters_presence-online"]`,
          class: "maejok-chatters_presence-online",
        },
        wrapper: {
          selector: `[class*="maejok-chatters_presence-container"]`,
          class: "maejok-chatters_presence-container",
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
      selector: `[class^="chat_messages__"]`,
      class: `chat_messages__2IBEJ`,
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
      endorsement: {
        selector: `[class^="chat-message-default_endorsement__"]`,
        class: `chat-message-default_endorsement__n_LUu`,
      },
      grayName: {
        selector: `.chat-message-default_free___3d5O`,
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
          normalize: {
            class: `maejok-hide-fonts`,
          },
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
    tts: {
      selector: `[class^="chat-message-tts_chat-message-tts__"]`,
      class: "chat-message-tts_chat-message-tts__2Jlxi",
    },
    sfx: {
      selector: `[class^="chat-message-sfx_chat-message-sfx__"]`,
      class: "chat-message-sfx_chat-message-sfx__OGv6q",
    },
    scroll: {
      selector: `[class^="chat_scroll"]`,
      class: `chat_scroll__6Tqdf`,
    },
    input: {
      selector: `[id="chat-input"]`,
      class: `chat-input_input__jljCU`,
      id: `chat-input`,
      form: {
        selector: `[class^="chat-input_chat-input__"]`,
        class: "chat-input_chat-input__GAgOF",
      },
      wrapper: {
        selector: `[class^="chat-input_input-wrapper__"]`,
        class: "chat-input_input-wrapper__rjiu1",
      },
      placeholder: {
        selector: `[class^="chat-input_placeholder"]`,
        class: `chat-input_placeholder__8Brjt `,
      },
      actions: {
        selector: `[class^="chat-input_actions"]`,
        class: `chat-input_actions__QqSJK`,
        medals: {
          selector: `[class^="medal-selector_medal-selector-wrapper"]`,
          class: "medal-selector_medal-selector-wrapper__bR_Ts",
        },
        inputLength: {
          selector: `[class^="chat-input_length__"]`,
          class: "chat-input_length__c7xG6",
        },
      },
      rich: {
        mention: "chat-input-mention_chat-input-mention__pDrCH",
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
      class: "button_button__p28wJ",
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
      },
      icon: {
        selector: `[class^="icon_icon]`,
        class: "icon_icon__bDzMA",
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
    prompt: {
      selector: `[class*="maejok-modal_prompt"]`,
      class: "maejok-modal_prompt",
      keyname: {
        selector: `[class="maejok-modal_keyprompt_name"]`,
        class: "maejok-modal_keyprompt_name",
      },
      roomname: {
        selector: `[class="maejok-modal_roomname"]`,
        class: "maejok-modal_roomname",
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
        class: `chat-input_action__qw4PQ`,
        icon: { class: [`icon_icon__bDzMA`] },
      },
    },
    tabs: {
      bar: {
        selector: `[class^="maejok-settings_tab-bar"]`,
        class: [`button-group_button-group__7lSi7`, `maejok-settings_tab-bar`],
      },
      tab: {
        selector: `[class^="maejok-tab-button"]`,
        class: [`maejok-tab-button`],
        active: {
          class: `button-group_selected__rLKL4`,
        },
      },
      panel: {
        selector: `[class^="maejok-settings_tab-panel"]`,
        class: [`maejok-settings_tab-panel`],
      },
      button: {
        selector: `[class^="maejok-settings_body"]`,
        classes: [`maejok-tab-button`],
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
        label: { class: "maejok-input-help-label" },
      },
    },
  },
  emotes: {
    selector: `[class^="maejok-modal-emotes"]`,
    class: "maejok-modal-emotes",
    note: { class: "maejok-emotes-list-note" },
    list: {
      selector: `[class^="maejok-emotes-list"]`,
      class: "maejok-emotes-list",
      label: {
        selector: `[class^="maejok-emotes-list-label"]`,
        class: "maejok-emotes-list-label",
      },
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
        pin: {
          selector: `[class^="maejok-emotes-list_item_pin"]`,
          class: "maejok-emotes-list_item_pin",
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
        `color-button_color-button__cW61T`,
        `color-button_md__GaczN`,
        `button_button__p28wJ`,
      ],
      bind: {
        class: [
          "maejok-input-button-bind",
          "button_sm__O72y2",
          "button_button__p28wJ",
        ],
        selector: `[class*="maejok-input-button-bind"]`,
      },
      img_colors: {
        lightGreen: "hsla(53, 88%, 78%, .1)",
        red: "hsla(3, 100%, 73%, .1)",
        darkGreen: "rgba(85, 213, 180, .1)",
      },
      wrapper: { class: [`maejok-input-button-wrapper`] },
      label: {
        class: [`color-button_text__3OQAq`],
        selector: `[class*="color-button_text__3OQAq"]`,
      },
      save: { class: [`maejok-input-button-save`, `button_button__p28wJ`] },
      standard: {
        classes: ["button_sm__O72y2", "button_button__p28wJ"],
      },
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
  takeover: {
    happening: {
      selector: `[class^="happening_happening__"]`,
      class: "happening_happening__Ca2E7",
    },
  },
};

export default Elements;
