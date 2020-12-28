# Wayward Mod Learnings

A mod for learning how to build a [Wayward mod](https://github.com/WaywardGame/types/wiki/Prerequisites). We try to do as much as possible within a theme.

The theme for our mod is `charcuterie`.

## What this mod does

- Modify existing content
    - Removes the following recipes as they conflict with our theme. Any items premade before this mod is loaded will remain, they just won't be craftable. Commented with `// -- Recipes to Remove` in code.
        - Pemmican
        - Cooked Pemmican

## TODO

- [ ] Make bundle of twigs and leaves. Quality of life improvement for the established player. Each bundle will bump the fire level up by one (embers -> almost extinguished -> struggling... etc).
    - [ ] Purpose to bump up fire level, which seem to be separated by a value of 150.
    - [ ] Demonstrate `onUse` with definition for stokeFire, see https://waywardgame.github.io/interfaces/iitemdescription.html#onuse
- [ ] Make smoker doodad

## Dev Notes

- [Wayward mod API docs](https://waywardgame.github.io/index.html)
- To deploy on a Mac with a Steam Wayward for development purposes: `npm run deploy:dev`
- To extract resources into a `.gitignore`d location in this directory: `node_modules/.bin/asar extract ~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/Resources/app.asar resources`
- File locations
    - MacOS, Steam
        - App: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/Wayward.app/Contents/MacOS/Electron`
        - Game logs: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/logs/wayward.log`
            - Logs will eventually rotate and be numbered.
        - Mods, local: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/mods/`
        - Mods, steam: `~/Library/Application\ Support/Steam/steamapps/common/Wayward/workshop/mods`
