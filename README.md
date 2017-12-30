# CoinMarketCap Desktop

[![OS X build](https://travis-ci.org/PaulRBerg/CoinMarketCap-Desktop.svg?branch=staging)](https://travis-ci.org/PaulRBerg/CoinMarketCap-Desktop)
[![Windows build](https://ci.appveyor.com/api/projects/status/2oar528hietbc77t/branch/staging?svg=true)](https://ci.appveyor.com/project/PaulRBerg/CoinMarketCap-Desktop)
[![Linux builds](https://circleci.com/gh/PaulRBerg/CoinMarketCap-Desktop/tree/staging.svg?style=shield)](https://circleci.com/gh/PaulRBerg/CoinMarketCap-Desktop)
[![Services status](https://img.shields.io/badge/services-status-blue.svg)](https://status.coinmarketcapdesktop.com/)
[![Join the chat](https://badges.gitter.im/Join%20Chat.svg)][1]
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PaulRBerg/CoinMarketCap-Desktop/blob/master/LICENSE)

A desktop wrapper for the official [CoinMarketCap](https://coinmarketcap.com). Track the cryptocurrency prices and trends with ease!
The initial codebase was forked from the [Messenger for Desktop](https://github.com/aluxian/Messenger-For-Desktop) project developed by [@aluxian](https://github.com/aluxian).

## Roadmap :rocket:

- Add refresh button
- Ability to set notifications when a specific price is hit

## How to install

**Note:** If you download from the [releases page](https://github.com/PaulRBerg/CoinMarketCap-Desktop/releases), be careful what version you pick. Releases that end with `-beta` are beta releases, the ones that end with `-dev` are development releases, and the rest are stable. If you're unsure which to pick, opt for stable. Once you download the app, you'll be able to switch to another channel from the menu.

- **dev:** these releases get the newest and hottest features, but they are less tested and might break things
- **beta:** these releases are the right balance between getting new features early while staying away from nasty bugs
- **stable:** these releases are more thoroughly tested; they receive new features later, but there's a lower chance that things will go wrong

If you want to help us make *CoinMarketCap Desktop* better, `dev` or `beta` are the way to go.

### OS X

*DMG or zip:*

1. Download [coinmarketcapdesktop-x.x.x-osx.dmg][LR] or [coinmarketcapdesktop-x.x.x-osx.zip][LR]
2. Open or unzip the file and drag the app into the `Applications` folder
3. Done! The app will update automatically

### Windows

*Installer (recommended):*

1. Download [coinmarketcapdesktop-x.x.x-win32-nsis.exe][LR]
2. Run the installer, wait until it finishes
3. Done! The app will update automatically

*Portable:*

1. Download [coinmarketcapdesktop-x.x.x-win32-portable.zip][LR]
2. Extract the zip wherever you want (e.g. a flash drive) and run the app from there
3. Done! The app will NOT update automatically, but you can still check for updates

### Linux

*Ubuntu, Debian 8+ (deb package):*

1. Download [coinmarketcapdesktop-x.x.x-linux-arch.deb][LR]
2. Double click and install, or run `dpkg -i coinmarketcapdesktop-x.x.x-linux-arch.deb` in the terminal
3. Start the app with your app launcher or by running `coinmarketcapdesktop` in a terminal
4. Done! The app will NOT update automatically, but you can still check for updates

*Fedora, CentOS, Red Hat (RPM package):*

1. Download [coinmarketcapdesktop-x.x.x-linux-arch.rpm][LR]
2. Double click and install, or run `rpm -ivh coinmarketcapdesktop-x.x.x-linux-arch.rpm` in the terminal
3. Start the app with your app launcher or by running `coinmarketcapdesktop` in a terminal
4. Done! The app will NOT update automatically, but you can still check for updates

[LR]: https://github.com/PaulRBerg/CoinMarketCap-Desktop/releases

# For Developers

Contributions are welcome! Please help me make *CoinMarketCap Desktop* the best app for cryptocurrency price tracking. For feature requests and bug reports please [submit an issue](https://github.com/PaulRBerg/CoinMarketCap-Desktop/issues/new?labels=bug) or get in touch with me on [Gitter][1] or Twitter [@PaulRBerg](https://twitter.com/PaulRberg).

## Build

> **Note:** for some tasks, a GitHub access token might be required (if you get errors, make sure you have this token). After you generate it (see [here](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) if you need help;  `repo` permissions are enough), set it as an env var:
> - Unix: `export GITHUB_TOKEN=123`
> - Windows: `set GITHUB_TOKEN=123`  
>  
> I recommend [dotenv](https://google.com) for local builds.

### Install pre-requisites

If you want to build `deb` and `rpm` packages for Linux, you also need [fpm](https://github.com/jordansissel/fpm). To install it on OS X:

```
sudo gem install fpm
brew install rpm
```

### Install dependencies

Global dependencies:

```
npm install -g gulp
```

Local dependencies:

```
npm install
cd src && npm install
```

Be careful if you update the dependencies, as the app might crash when the CI scripts will try to build it.

### Native modules

The app uses native modules. Make sure you rebuild the modules before building the app:

```
gulp rebuild:<32|64>
```

### Build and watch

During development you can use the `watch` tasks, which have live reload. As you edit files in `./src`, they will be re-compiled and moved into the `build` folder:

```
gulp watch:<darwin64|linux32|linux64|win32>
```

If you want to build it just one time, use `build`:

```
gulp build:<darwin64|linux32|linux64|win32>
```

For production builds, set `NODE_ENV=production` or use the `--prod` flag. Production builds don't include dev modules.

```
gulp build:<darwin64|linux32|linux64|win32> --prod
NODE_ENV=production gulp build:<darwin64|linux32|linux64|win32>
```

To see detailed logs, run every gulp task with the `--verbose` flag.

> If you don't specify a platform when running a task, the task will run for the current platform.

### App debug logs

To see debug messages while running the app, set the `DEBUG` env var. This will print logs from the main process.

```
export DEBUG=coinmarketcapdesktop:*
```

To open the webview dev tools, type this in the main dev tools console:

```
wv.openDevTools();
```

If you want to automatically open the webview dev tools, use:

```
localStorage.autoLaunchDevTools = true; // on
localStorage.removeItem('autoLaunchDevTools'); // off
```

### Pack

#### OS X

You'll need to set these env vars:

```
SIGN_DARWIN_IDENTITY
SIGN_DARWIN_KEYCHAIN_NAME
SIGN_DARWIN_KEYCHAIN_PASSWORD
```

Pack the app in a neat .dmg:

```
gulp pack:darwin64:<dmg:zip> [--prod]
```

This uses [node-appdmg](https://www.npmjs.com/package/appdmg) which works only on OS X machines.

#### Windows

You'll need to set these env vars:

```
SIGNTOOL_PATH=
SIGN_WIN_CERTIFICATE_FILE=
SIGN_WIN_CERTIFICATE_PASSWORD=
```

Create an installer. This will also sign every executable inside the app, and the setup exe itself:

```
gulp pack:win32:installer [--prod]
```

Or, if you prefer, create a portable zip. This will also sign the executable:

```
gulp pack:win32:portable [--prod]
```

These tasks only work on Windows machines due to their dependencies: [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) and Microsoft's SignTool.

#### Linux

Create deb/rpm packages:

```
gulp pack:<linux32|linux64>:<deb|rpm> [--prod]
```

Make sure you've installed [fpm](https://github.com/jordansissel/fpm).

### Release flow

`develop -> staging -> deploy -> master`

1. All work is done on branch `develop`. Every push to `develop` will make the CIs run code linting and other checks.
2. In order to build, push to `staging`. Every push to `staging` will make the CIs build the app and upload it to Bintray at [PaulRBerg/artifacts](https://dl.bintray.com/PaulRBerg/artifacts/staging/), available for testing.
3. After a version is tested and is ready for release, push it to `deploy`. This will rebuild the app and upload it to GitHub, Bintray and other repositories.
4. Now, the code is ready to be merged into `master`.

[1]: https://gitter.im/CoinMarketCap-Desktop
