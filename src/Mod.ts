import { ActionType } from "entity/action/IAction"
import { SkillType } from "entity/IHuman"
import { MessageType } from "entity/player/IMessageManager"
import {
  IItemDescription,
  ItemType,
  ItemTypeGroup,
  RecipeLevel,
} from "item/IItem"
import { itemDescriptions, RecipeComponent } from "item/Items"
import Message from "language/dictionary/Message"
import { HookMethod } from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"
import * as rubberDuck from "./rubber-duck"

export default class WaywardModLearnings extends Mod {
  static MOD_ID = "WayardModLearnings"

  @Mod.instance<WaywardModLearnings>(WaywardModLearnings.MOD_ID)
  public static readonly INSTANCE: WaywardModLearnings

  // -- Add new recipe: twig bundle
  // Something like this, based off of existing items, could be dynamically created, but we
  // hard code everything for now ;)
  //
  // Translations are keyed via the pseudo code template `mod${modName.removeSpaces().startCase()${item id}}`.
  // Here the translation key would be `modWaywardModLearningsTwigBundle` and an English translation
  // would be defined in the file `lang/english.json` at the key `dictionaries.item.modWaywardModLearningsTwigBundle`.
  //
  // Item images must be provided and named `${item id.lowerCase()}.png` for the 16x16 pixel inventory image, and
  // `${item id.lowerCase()}_8.png` for the 8x8 item-on-the-ground image. Item images are stored in
  // `static/image/item` and our images for this item are named `twigbundle.png` and `twigbundle_8.png`.
  @Register.item("TwigBundle", {
    disassemble: true,
    flammable: true,
    onBurn: [ItemType.Charcoal],
    onUse: {
      // Video game logic: 6 * 50 from twigs + a bonus from used up cordage
      [ActionType.StokeFire]: 325,
    },
    recipe: {
      components: [
        RecipeComponent(
          ItemType.Twigs,
          // Twigs assumed to have 50 "stoke fire" strength each.
          6,
          6,
          6,
          false
        ),
        RecipeComponent(ItemTypeGroup.Cordage, 1, 1, 1, false),
      ],
      level: RecipeLevel.Simple,
      reputation: 0,
      skill: SkillType.Camping,
    },
    use: [ActionType.StokeFire],
    // 6 * twig weight, cordage considered neglibaile
    weight: 6 * 0.1,
    // 6 * twig worth plus labor
    worth: 6 * 5 + 5,
  })
  public itemTwigBundle: ItemType

  // -- Recipes to Remove
  recipesToRemoveFromTheseItemTypes: ItemType[] = [
    ItemType.Pemmican,
    ItemType.CookedPemmican,
  ]
  // Hold a reference to the recipe objects we remove.
  recipesRemoved: Record<string, IItemDescription["recipe"]> = {}

  @Override
  onInitialize(): void {
    // -- Add new recipe: twig bundle
    // Some debug code I used to inspect loaded structures.
    rubberDuck.itemTypeGroup.summarize("Kindling")
    rubberDuck.itemTypeGroup.details("Kindling")
    const stokeFireValue =
      itemDescriptions[ItemType.Twigs].onUse?.[ActionType.StokeFire]
    this.getLog().debug(
      "\n\nDEBUG: Stoke fire value for twigs is:",
      stokeFireValue
    )

    // -- Recipes to Remove
    // Depending on what other mods are running, we can't guarantee that something else didn't
    // modify the recipes or the itemDescriptions before we get here.
    this.recipesToRemoveFromTheseItemTypes.forEach((itemType) => {
      // There are many globals available in this game, discoverable at `https://waywardgame.github.io/globals.html`
      const itemDescription = itemDescriptions[itemType]
      if (itemDescription?.recipe) {
        // Log messages are automagically prefixed with our mod name and the function works similar to `console.log`.
        this.getLog().debug(
          `Removing recipe from ${ItemType[itemType] || itemType}`
        )
        this.recipesRemoved[itemType] = itemDescription.recipe
        delete itemDescription.recipe
      }
    })
  }

  @Override
  onUninitialize(): void {
    // -- Recipes to Remove
    // Restore the recipes when the game is unloaded. This might not be necessary, but better
    // to clean up after ourselves and not worry about it.
    this.recipesToRemoveFromTheseItemTypes.forEach((itemType) => {
      const recipe = this.recipesRemoved[itemType]
      if (recipe) {
        const itemDescription = itemDescriptions[itemType]
        if (itemDescription) {
          if (itemDescription?.recipe) {
            this.getLog().warn(
              `${
                ItemType[itemType] || itemType
              } has a recipe that will be replaced with our cached version.`
            )
          }
          this.getLog().debug(
            `Adding recipe back to ${ItemType[itemType] || itemType}`
          )
          itemDescription.recipe = recipe
        }
      }
    })
  }

  // -- Send message to player
  // Translations are keyed via the pseudo code template `mod${modName.removeSpaces().startCase()${message param}}`.
  // Here the translation key would be `modWaywardModLearningsModWarningToPlayer` and an English translation
  // would be defined in the file `lang/english.json` at the key `dictionaries.messages.modWaywardModLearningsModWarningToPlayer`.
  @Register.message("ModWarningToPlayer")
  public readonly messageModWarningToPlayer: Message

  @Override
  @HookMethod
  onGameScreenVisible(): void {
    // -- Send message to player
    localPlayer.messages
      .type(MessageType.Bad)
      .send(this.messageModWarningToPlayer)
  }
}
