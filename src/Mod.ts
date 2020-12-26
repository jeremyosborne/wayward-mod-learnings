import {MessageType} from "entity/player/IMessageManager"
import {Dictionary} from "language/Dictionaries"
import Translation from "language/Translation"
import {HookMethod} from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"

export enum TranslationStringKeys {
  "Greetings, welcome to the Wayward Mod Learnings! Don't use this with a saved game you care about."
}

export default class WaywardModLearnings extends Mod {

  static MOD_ID = "Wayard Mod Learnings"

  // ---------------------
  // Wayward "always called without decoration" hooks (begin)
  onInitialize () {
  }

  onUninitialize () {
  }

  onLoad () {
    // this.getLog().info("Hello World!");
  }

  onUnload () {
    // this.getLog().info("Goodbye World!");
  }

  onSave () {

  }
  // Wayward hooks (end)
  // ---------------------

  @Mod.instance(WaywardModLearnings.MOD_ID)
  public static readonly INSTANCE: WaywardModLearnings;

  @Register.dictionary("Messages", TranslationStringKeys)
  public readonly translations: Dictionary;

  @Override @HookMethod
  onGameScreenVisible (): void {
    localPlayer.messages.type(MessageType.None).send(_t("Greetings, welcome to the Wayward Mod Learnings! Don't use this with a saved game you care about."))
  }
}

export const _t = (entry: keyof typeof TranslationStringKeys) => {
  return new Translation(WaywardModLearnings.INSTANCE.translations, entry)
}
