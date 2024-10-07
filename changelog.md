# MAEJOK-TOOLS CHANGE LOG

# **_v2.16.0_**

_Release: 10-06-2024_

### Notes

- Adding feature to remove special chat fonts

### Bug Fixes

- N/A

### Features Added / Changed

- Added setting to standardize chat fonts [#10](https://github.com/f3rked/maej3rked-tools/pull/10)

# **_v2.15.1_**

_Release: 09-08-2024_

### Notes

- Merging feature from upstream PR

### Bug Fixes

- N/A

### Features Added / Changed

- Add TTS filter warning when entering text for TTS or SFX that will be censored [#9](https://github.com/f3rked/maej3rked-tools/pull/9)

# **_v2.15.0_**

_Release: 07-26-2024_

### Notes

- First fork release

### Bug Fixes

- Fix mentions log [#6](https://github.com/f3rked/maej3rked-tools/pull/6)
- Fix modal close button [#5](https://github.com/f3rked/maej3rked-tools/pull/5)

### Features Added / Changed

- Add setting and shortcut to hide video control overlay(`CTRL+SHIFT+H`) [#5](https://github.com/f3rked/maej3rked-tools/pull/5)
- Add setting to enable dragging TTS modal [#4](https://github.com/f3rked/maej3rked-tools/pull/4)

### Removed

- N/A

---

# **_v2.14.2_**

_Release: 07-05-2024_

### Notes

- N/A

### Bug Fixes

- Fix issue with plugin load, fix bigscreen mode [#64](https://github.com/maejok-xx/maejok-tools/pull/64)

### Features Added / Changed

- Add popups to hide screen takeovers [#64](https://github.com/maejok-xx/maejok-tools/pull/64)

### Removed

- N/A

---

# **_v2.14.1_**

_Release: 04-28-2024_

### Notes

- Huge thanks again to [f3rked](https://github.com/f3rked) for these fixes and additions!

### Bug Fixes

- Fix online chatters count [#54](https://github.com/maejok-xx/maejok-tools/pull/54)
- Fix unecessary requests [#56](https://github.com/maejok-xx/maejok-tools/pull/56)

### Features Added / Changed

- Add glowing eye on logo hover [#55](https://github.com/maejok-xx/maejok-tools/pull/55/)

### Removed

- N/A

---

# **_v2.14.0_**

_Release: 04-21-2024_

### Notes

- Updated to work with the Season 2.5 site.
- MASSIVE thank you to [f3rked](https://github.com/f3rked) for making this happen! I wasn't going to do it, so you only have him to thank!

### Bug Fixes

- N/A

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.6_**

### Notes

- Fixes the script trying to run everywhere using GreaseMonkey.
- The way webpack is packing and minifying the script adds multi-line comments to the userscript.config.js, which for some reason, GreaseMonkey doesn't like, but TamperMonkey mind. This "fix" doesn't actually address the issue with webpack since there probably won't be any more updates to this -- it just replaces the userscript banner with the proper single-line comment format, so building this yourself for GreaseMonkey will still produce the same issue, unless you remove the multi-line comments manually after building.

# **_v2.13.5_**

### Notes

- This will get things working again and will probably be the last update until S3.

### Bug Fixes

- userData not loading again
- [Mention log doesn't pick up name caps variations / max-height](https://github.com/maejok-xx/maejok-tools/issues/50)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.4_**

### Notes

- User data doesn't come down the websocket every page load, which caused some issues, this fixes that by caching the user data and displaying and error if it doesn't load

### Bug Fixes

- [userData not loading](https://github.com/maejok-xx/maejok-tools/issues/48) fixed by [cache userData](https://github.com/maejok-xx/maejok-tools/pull/49)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.3_**

### Notes

- Fixes mentions log tracking random users

### Bug Fixes

- [Only get user data once](https://github.com/maejok-xx/maejok-tools/commit/7abbdf4bc09d87060b05212c487414eaf3b937fd)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.2_**

### Notes

- Just making some improvments.

### Bug Fixes

- Fixed mentions log width over-expanding
- Show Update Notice earlier in case of failure to load script

### Features Added / Changed

- [Improve User Data Fetching](https://github.com/maejok-xx/maejok-tools/pull/47)

### Removed

- N/A

---

# **_v2.13.1_**

### Notes

- Fixes plugin not loading.

### Bug Fixes

- [Plugin not loading](https://github.com/maejok-xx/maejok-tools/pull/46)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.0_**

### Notes

- Huge thanks to deerfarce for this one! This update adds Custom Keybinds for navigating streams and a couple other options.

### Bug Fixes

- [SFX chat menu not showing](https://github.com/maejok-xx/maejok-tools/commit/9b2109362df1af1a9fd474dc66d048acfbf186c0)

### Features Added / Changed

- [Customizable Keybinds](https://github.com/maejok-xx/maejok-tools/pull/44) - _by [deerfarce](https://github./com/deerfarce)_

### Removed

- N/A

---

# **_v2.12.0_**

### Notes

- Since there's a pop-out chat option now, I decided to switch Big Chat mode to Big Screen. This is intended for clippers to get a larger screen capture area while still being able to utilize stream navigation and auto-mode.

### Bug Fixes

- N/A

### Features Added / Changed

- [BigChat Becomes BigScreen](https://github.com/maejok-xx/maejok-tools/pull/43)

### Removed

- N/A

---

# **_v2.11.0_**

### Notes

- This addition is difficult to test on the production site due to how infrequent takeovers happen, but it works on the dev server, so it should be okay. If it doesn't work, I'll get a fix out asap.

### Bug Fixes

- N/A

### Features Added

- [Hide Screen Takeovers](https://github.com/maejok-xx/maejok-tools/commit/035036a34a06723859895dd49724ee46cdcfbb54)

### Removed

- N/A

---

# **_v2.10.3_**

### Notes

- Updates to the way user data is cached brok Mention Logger.. this update fixes it.
- Improved Dim Mode for better camera/episode clarity and a generally darker experience.

### Bug Fixes

- [Mention Logger not working](https://github.com/maejok-xx/maejok-tools/issues/38)

### Features Added / Improved

- [Improved Dim Mode](https://github.com/maejok-xx/maejok-tools/commit/84bab2f23213b23f07f2c066e7fe1e82bbc18929)

### Removed

- N/A

---

# **_v2.10.2_**

### Notes

- Just adds a notice on client crashes to report bugs to the proper people.

### Bug Fixes

- N/A

### Features Added

- Client crash notice

### Removed

- N/A

---

# **_v2.10.1_**

### Notes

- The new chat input on fishtank broke some things in the plugin. This update just stops the crashes and updates some element class names.

### Bug Fixes

- [Site crash/chat input #36](https://github.com/maejok-xx/maejok-tools/issues/36)

### Features Added

- N/A

### Removed

- "Use" emote button removed. You'll just have to type the emote yourself for now.

---

# **_v2.10.0_**

### Notes

- I was unable to test the SFX hider option since they haven't been enabled, but it should work... time will tell

### Bug Fixes

- Fix errors being caused by message user data not being defined on some messages
- Fix issue with grabbing clan data
- Only load plugin on main site

### Features Added

- [Toggle Scan Lines Effect](https://github.com/maejok-xx/maejok-tools/issues/33) _suggested by: Tickle_
- [Toggle TTS/SFX Messages](https://github.com/maejok-xx/maejok-tools/pull/34)
- [Toggle Endorsements in chat](https://github.com/maejok-xx/maejok-tools/pull/35)

### Removed

- N/A

---

# **_v2.9.2_**

### Notes

- This update fixes the plugin again.

### Bug Fixes

- Fix features not working since last update and livestreams going live

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.9.1_**

### Notes

- This update fixes the plugin not working with Season 2 live.

### Bug Fixes

- Fix not loading since S2 started

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.9.0_**

### Notes

- This update is fixes two small bugs and adds two small features.

### Bug Fixes

- [Clan Invite button size & position](https://github.com/maejok-xx/maejok-tools/issues/27)
- [Highlight message context not working properly](https://github.com/maejok-xx/maejok-tools/issues/28)

### Features Added

- [Emote Pinning](https://github.com/maejok-xx/maejok-tools/issues/1) _suggested by: you1307_
- [Mention Log Reverse Sort Order Option](https://github.com/maejok-xx/maejok-tools/pull/23) _suggested by: you1307_

### Removed

- N/A

---

# **_v2.8.0_**

### Notes

- This update is to help prevent inturruptions, primarily for the sake of clippers/streamers.
- It's unknown how the "disable sound effects" option will affect livestream audio once cams are enabled, but it shouldn't be an issue. If it is, I'll try to get an update out quickly.
- Enabling "Toggle Global Mission pop-ups" may reduce performance as it has to watch the entire page body for mutations to hide the goldstriker background image.

### Bug Fixes

- [Option config button and help icon styles](https://github.com/maejok-xx/maejok-tools/issues/18)
- [New TTS/SFX buttons meefed up XP bar in Bigchat mode](https://github.com/maejok-xx/maejok-tools/issues/19)

### Features Added

- [Toogle Sound Effect](https://github.com/maejok-xx/maejok-tools/pull/23)
- [Toogle Global Mission pop-ups](https://github.com/maejok-xx/maejok-tools/pull/23)
- ["fix" dark display names](https://github.com/maejok-xx/maejok-tools/issues/24)

### Removed

- N/A

---

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
