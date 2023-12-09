# MAEJOK-TOOLS CHANGE LOG

# **_v2.7.2_**

### Notes

- Some updates to fishtank's stylesheet were made which broke some of the plugin layout stuff. This update just fixes those things.

### Bug Fixes

- [Enormous settings button](https://github.com/maejok-xx/maejok-tools/issues/9)
- [Enormous settings tabs](https://github.com/maejok-xx/maejok-tools/issues/11)
- [Mentions scrollbar doesn't always show](https://github.com/maejok-xx/maejok-tools/issues/10)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.7.1_**

### Notes

- N/A

### Bug Fixes

- [Big Chat Bug](https://github.com/maejok-xx/maejok-tools/issues/2)
- [Mentions log duplicates itself by toggling options](https://github.com/maejok-xx/maejok-tools/issues/5)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.7.0_**

### Notes

- COMPLETE PLUGIN REWRITE

### Bug Fixes

- N/A

### Features Added

- Mentions logging
- Normalize chat messages (removes red/gold text formatting)
- Right-click menus for chat messages
- Emotes list menu (right click on chat input box)
- Selectively hide dice rolling (/roll) without hiding all emotes
- ... and a bunch of other small stuff

### Removed

- N/A

---

# **_v2.4.7 / 2.4.8_**

### Notes

- 2.4.7 to 2.4.8 is because I'm an idiot and updated code without testing JUST before pushing 2.4.7
- This update is just bugfixes and a little code refactoring
- Made dense chat a little less dense...might make density customizable in settings at another date

### Bug Fixes

- Fix global mission button showing through in Mid/BigChat on reload with Persist BigChat enabled
- Fix chat modes toggling when opening/saving settings
- Fix countdown timer setting not working correctly
- Fix custom setting values not saving (chatters threshold, update check frequency, etc)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.4.6_**

### Notes

- The new "MidChat" mode will break to BigChat around 1200px due to how the site handles sizing of the chat window, however, you'll still be in MidChat mode if you resize down below 1200ishpx, so you'll still need to toggle twice to get back to normal mode...this is not a bug! Don't @ me about this.

### Bug Fixes

- N/A

### Features Added

- Settings tab to edit "Friends" and "Watched" users and their corresponding highlight colors. Google HEX or RGBA color generator to find colors.
- Ability to customize Friends and Watched Users message highlight colors
- Updated BigChat to now have a "MidChat" mode. Toggle once for MidChat, twice for BigChat, and thrice to go back to the original layout.

### Removed

- N/A

---

# **_v2.4.5_**

### Notes

- Cleaned up settings Panel

### Bug Fixes

- N/A

### Features Added

- N/A

### Features Removed

- None

---

# **_v2.4.4_**

### Notes

- This update is mostly to get the update system finished, and to clean up and refactor some code, and most importantly, to put a notice in place not to bother Wes (fishtank developer) with any bugs or issues created by me distributing this plugin.

### Bug Fixes

- Issue with user message highlighting persistence (you'll need to reselect any previously highlighted users)
- Mobile navigation bar showing and XP bar being messed up while in Big Chat while at low resolutions
- Chatter count now resets when you change chat rooms

### Features Added

- These change logs
- Agreement not to bother Wes with bugs created by using this plugin
- Click chatters count to show the users. Click the name to tag them.
- Big Chat state now persists between reloads and resets to whatever state it was in when you left the site/refreshed (configurable in settings)
- "Help" links in settings to help explain what each option does
- Update checks now run periodically (disable checks or change check frequency in settings)

### Features Removed

- None
