# Wayward Mod Learnings

The theme for our [Wayward mod](https://github.com/WaywardGame/types/wiki/Prerequisites) is `quality of life` and `learning how to mod Wayward`.

## What this mod does

- Send a translated message to the player in game, warning them they are using this experimental mod. Commented with `// -- Send message to player` in code.
- Content: modify existing
    - Removes the following recipes as they conflict with our theme. Any items premade before using this mod will remain, they just won't be craftable. Commented with `// -- Recipes to Remove` in code.
        - Pemmican
        - Cooked Pemmican
- Content: add new
    - `twig bundle`, commented with `// -- Add new recipe: twig bundle`
        - Quality of life improvement for the established player. For when you would rather keep your stone stills around and use them with less mouse clicks. 1 twig bundle should be enough to purify one batch of water.

## TODO

- [ ] Make smoker doodad

## Dev Notes

- [Wayward mod API docs](https://waywardgame.github.io/index.html)
- To deploy on a Mac with a Steam Wayward for development purposes: `npm run deploy:dev`
- To extract resources into a `.gitignore`d location in this directory: `node_modules/.bin/asar extract ~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/Resources/app.asar resources`
- File locations
    - MacOS, Steam
        - App: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/MacOS/Electron`
        - Game logs: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/logs/wayward.log`
            - Logs will do rotate with newest log being most recently numbered.
        - Mods, local: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/mods/`
        - Mods, steam: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/workshop/mods`
