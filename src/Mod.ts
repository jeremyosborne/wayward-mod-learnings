import {MessageType} from "entity/player/IMessageManager"
import Message from "language/dictionary/Message"
import {HookMethod} from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"

const MODULE_NAME = "WaywardModLearnings"

export default class WaywardModLearnings extends Mod {
  // ---------------------
  // Wayward hooks always called (begin)
  public onInitialize () {
  }

  public onUninitialize () {
  }

  public onLoad () {
    // this.getLog().info("Hello World!");
  }

  public onUnload () {
    // this.getLog().info("Goodbye World!");
  }

  public onSave () {

  }
  // Wayward hooks (end)
  // ---------------------

  @Register.message(MODULE_NAME)
  messageGreetings: Message;

  @Override @HookMethod
  public onGameScreenVisible (): void {
    localPlayer.messages.type(MessageType.None).send(this.messageGreetings)
  }
}
