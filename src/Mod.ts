import { MessageType } from "entity/player/IMessageManager"
import { ItemType, IItemDescription } from "item/IItem"
import { itemDescriptions } from "item/Items"
import Message from "language/dictionary/Message"
import { HookMethod } from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"

export default class WaywardModLearnings extends Mod {
  static MOD_ID = "WayardModLearnings"

  // ---------------------
  // Wayward "always called without decoration" hooks (begin)
  // onInitialize () {
  // }

  // onUninitialize () {
  // }

  // -- Recipes to Remove
  // These conflict with the theme of our mod. Don't remove the associated items.
  // I think (?) we need to keep the recipes and add them back in to the itemDescriptions
  // when we unload the mod.
  recipesToRemoveFromTheseItemTypes: ItemType[] = [
    ItemType.Pemmican,
    ItemType.CookedPemmican,
  ]
  recipesRemoved: Record<string, IItemDescription["recipe"]> = {}

  @Override
  public onLoad(): void {
    // -- Recipes to Remove
    // Depending on what other mods are running, we can't guarantee that something else didn't
    // modify the recipes or the itemDescriptions.
    this.recipesToRemoveFromTheseItemTypes.forEach((itemType) => {
      const itemDescription = itemDescriptions[itemType]
      if (itemDescription?.recipe) {
        this.getLog().debug(
          `Removing recipe from ${ItemType[itemType] || itemType}`
        )
        this.recipesRemoved[itemType] = itemDescription.recipe
        delete itemDescription.recipe
      }
    })
  }

  @Override
  public onUnload(): void {
    // -- Recipes to Remove
    // Return the recipes when the game is unloaded.
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

  // onSave () {
  // }
  // Wayward hooks (end)
  // ---------------------

  @Mod.instance(WaywardModLearnings.MOD_ID)
  public static readonly INSTANCE: WaywardModLearnings

  @Register.message("ModWarningToPlayer")
  public readonly messageModWarningToPlayer: Message

  @Override
  @HookMethod
  onGameScreenVisible(): void {
    localPlayer.messages
      .type(MessageType.Bad)
      .send(this.messageModWarningToPlayer)
  }
}
