# Wayward Mod Learnings

A mod for learning how to build a [Wayward mod](https://github.com/WaywardGame/types/wiki/Prerequisites).

## Dev Notes

* [Wayward mod API docs](https://waywardgame.github.io/index.html)
* MacOS Steam location for `+mod` commands: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/MacOS/Electron`
* To deploy on a Mac with a Steam Wayward for development purposes: `npm run deploy:dev`
* To extract resources into a `.gitignore`d location in this directory: `node_modules/.bin/asar extract ~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/Resources/app.asar resources`
* Game logs: `tail -f ~/Library/Application\ Support/Steam/steamapps/common/Wayward/logs/wayward.log`
