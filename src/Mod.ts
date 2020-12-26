import {MessageType} from "entity/player/IMessageManager"
import Message from "language/dictionary/Message"
import {HookMethod} from "mod/IHookHost"
import Mod from "mod/Mod"
import Register from "mod/ModRegistry"

export default class WaywardModLearnings extends Mod {
  // ---------------------
  // Wayward hooks always called (begin)
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

  @Register.message("Greetings")
  messageGreetings: Message;

  @Override @HookMethod
  onGameScreenVisible (): void {
    localPlayer.messages.type(MessageType.None).send(this.messageGreetings)
  }
}
