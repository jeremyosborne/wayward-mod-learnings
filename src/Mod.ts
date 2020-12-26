import {MessageType} from "entity/player/IMessageManager"
import Message from "language/dictionary/Message"
import {HookMethod} from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"

export default class WaywardModLearnings extends Mod {

  static MOD_ID = "Wayard Mod Learnings"

  // ---------------------
  // Wayward "always called without decoration" hooks (begin)
  // onInitialize () {
  // }

  // onUninitialize () {
  // }

  // The logs will show when a module is loaded or not, and log messages we generate are prefixed with our mod name.
  // onLoad () {
  //   this.getLog().info(`${WaywardModLearnings.MOD_ID}`);
  // }

  // onUnload () {
  //   // this.getLog().info("Goodbye World!");
  // }

  // onSave () {
  // }
  // Wayward hooks (end)
  // ---------------------

  @Mod.instance(WaywardModLearnings.MOD_ID)
  public static readonly INSTANCE: WaywardModLearnings

	@Register.message("ModWarningToPlayer")
	public readonly messageModWarningToPlayer: Message

  @Override @HookMethod
  onGameScreenVisible (): void {
    localPlayer.messages.type(MessageType.Bad).send(this.messageModWarningToPlayer)
  }
}
