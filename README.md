### Be sure to watch Season 1 and get ready for Season 2 at https://www.fishtank.live/

---

Features:

- Mentions log
- Emotes Menu (right click chat input)
- Chat Message Menus (right click messages)
- Mention Menu (right click a mention)
- BigChat mode (Use CTRL+` or CTRL+SHIFT+SPACE to toggle)
- "Friending" and "Watching" users
- Double-Click Messages in chat to toggle "Watching" of all messages from that user (persists between visits)
- Enter Clan Chat Automatically
- Active Chatters Count/List (click count to see list)
- Dense Chat mode
- Improved tagging
- Toggle in Chat: Timestamps/Avatars/Clans/XP/Roll/Emotes/Consumables/System Messages
- and a bunch of other stuff
- And it's all controllable via Integrated Settings Panel
- Plus more to come!

---

### Requires one of the following browser extensions to work:

- [TamperMonkey](https://www.tampermonkey.net/): _(Recommended)_

  - [Chrome/Brave](https://www.tampermonkey.net/index.php?browser=chrome)
  - [Firefox](https://www.tampermonkey.net/index.php?browser=firefox)
  - [Microsoft Edge](https://www.tampermonkey.net/index.php?browser=edge)
  - [Safari](https://www.tampermonkey.net/index.php?browser=safari)
  - [Opera](https://www.tampermonkey.net/index.php?browser=opera)

- [GreaseMonkey](https://www.greasespot.net/):

  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

- [Violentmonkey](https://violentmonkey.github.io/):
  - [Chrome/Brave](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
  - [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)

---

### HOW TO: Build from source

1. Start by cloning the repository into your project directory

   ```bash
   git clone https://github.com/maejok-xx/maejok-tools.git .
   ```

2. install the dev dependencies (listed at the bottom of this readme)

   ```bash
   npm i
   ```

3. Build:
   ```bash
   npm run build
   ```

**Note**: _Build output will be located at `./dist/maejok-tools.user.js`_

---

### HOW TO: Start in Dev Mode

Create a new Userscript using your browser extension of choice (eg: Tampermonkey) and add the following...

```js
// ==UserScript==
// @name         MAEJOK-TOOLS [DEV MODE]
// @description  Development Version of MAEJOK-TOOLS
// @version      0.0.0
// @icon         https://raw.githubusercontent.com/maejok-xx/maejok-tools/master/public/images/icon.png
// @match        *://*.fishtank.live/*
// @run-at       document-idle
// @require      file:\\\PATH_TO_PROJECT_DIR\dist\maejok-tools.user.js
// ==/UserScript==
```

**Be sure to replace `PATH_TO_PROJECT_DIR` with the path to your actual project directory and save the new userscript.**

Then navigate to your project root

eg:

```bash
cd C:\Users\BigHeadedLoser\Desktop\maejok-tools
```

And Run

```bash
npm run dev
```

Now any time you update and save a `.scss` or `.js` file, Webpack will automatically rebuild the plugin. You must refresh Fishtank.live to see your changes.

**Note**: _Build output will be located at `./dist/maejok-tools.user.js`_

When you're all done, be sure to [create a pull request](https://github.com/maejok-xx/maejok-tools/pulls) with your updates! 😊

---

### Links

#### Want to contribute to maejok-tools? [Create a Pull Request](https://github.com/maejok-xx/maejok-tools/pulls)!

#### Find this script on [Greasyfork](https://greasyfork.org/en/scripts/465416-maejok-tools-for-fishtank-live)

#### Feel free to [create an issue](https://github.com/maejok-xx/maejok-tools/issues) if you come across any bugs or have any new feature suggestions

---

### Dev Dependencies:

- [css-loader](https://npmjs.com/package/css-loader)
- [file-loader](https://npmjs.com/package/css-loader)
- [sass](https://npmjs.com/package/css-loader)
- [sass-loader](https://npmjs.com/package/css-loader)
- [style-loader](https://npmjs.com/package/css-loader)
- [webpack](https://npmjs.com/package/css-loader)
- [webpack-cli](https://npmjs.com/package/css-loader)
- [terser-webpack-plugin](https://npmjs.com/package/css-loader)
