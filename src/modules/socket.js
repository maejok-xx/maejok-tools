import msgpack from "msgpack-lite";
import state from "./state";
import config from "./config";
import { hasKeys, toast } from "./functions";

export const listenOnWebsocket = () => {
  const originalDataGetter = Object.getOwnPropertyDescriptor(
    MessageEvent.prototype,
    "data"
  ).get;

  function overrideDataGetter() {
    const isWebSocket = this.currentTarget instanceof WebSocket;

    if (!isWebSocket) {
      return originalDataGetter.call(this);
    }

    const messageData = originalDataGetter.call(this);

    Object.defineProperty(this, "data", { value: messageData });

    if (messageData instanceof ArrayBuffer) {
      const isUserDataSet = state.get("user") !== null;

      if (isUserDataSet) {
        return messageData;
      }

      const uint8Message = new Uint8Array(messageData);
      const decodedMessage = msgpack.decode(uint8Message);

      const user = decodedMessage.data[0];

      // prettier-ignore
      const userDataKeys = ["id","displayName","seasonPass","xp","clan","joined","pfps","medals","tokens","bio","endorsement","integrations"];

      const isUserData = hasKeys(user, userDataKeys);

      const isChatMessage =
        decodedMessage.type === 2 && user === "chat:message";

      if (isChatMessage && !isUserDataSet) {
        const cachedUserData = config.get("userData");

        if (cachedUserData === null) {
          toast(
            "MAEJOK-TOOLS ERROR: User data could not be loaded. Please refresh to try again.",
            "error",
            20000
          );
          state.set("user", false);
        } else {
          state.set("user", cachedUserData);
        }
        return messageData;
      }

      if (!isUserData) {
        return messageData;
      }

      state.set("user", user);
      config.set("userData", user);
      config.save();
    }

    return messageData;
  }

  Object.defineProperty(MessageEvent.prototype, "data", {
    get: overrideDataGetter,
  });
};
