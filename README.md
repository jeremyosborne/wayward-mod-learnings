# Wayward Mod Learnings

A mod for learning how to build a [Wayward mod](https://github.com/WaywardGame/types/wiki/Prerequisites).

## Dev Notes

* [Wayward mod API docs](https://waywardgame.github.io/index.html)
* MacOS Steam location for `+mod` commands is `~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/MacOS/Electron`.

rsync -av --progress . ~/Library/Application\ Support/Steam/steamapps/common/Wayward/mods/wayward-mod-learnings --exclude node_modules --exclude .git
