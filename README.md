# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# THIS IS NOT READY FOR RELEASE

# THINGS WILL NOT WORK PROPERLY

# MAEJOK-TOOLS for Fishtank Live

### Be sure to watch Season 1 and get ready for Season 2 at https://www.fishtank.live/

---

Features:

- LIST FEATURES

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

### To build from source:

1. Start by cloning the repository into your project directory

   `git clone https://github.com/maejok-xx/maejok-tools.git .`

2. install the dev dependencies (listed at the bottom of this readme)

   `npm i`

3. Build:

   `npm run build`

**Note**: _Build output will be located at `./dist/maejok-tools.user.js`_

---

### To run in development mode

1. Create a new Userscript in your extension of choice (eg: tampermonkey)

2. Add this

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

3. Be sure to replace `PATH_TO_PROJECT_DIR` with the path to your project directory and save the new userscript.

4. Run:

   `npm run build`

Now any time you make changes and save a file, Webpack will rebuild the plugin in development mode. All that's left is for you to refresh Fishtank.live to see your changes.

**Note**: _Build output will be located at `./dist/maejok-tools.user.js`_

When you're all done, be sure to create a pull request with your updates/additions! 😊

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
