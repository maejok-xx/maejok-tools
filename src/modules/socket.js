import msgpack from "msgpack-lite";
import state from "./state";

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
      const uint8Message = new Uint8Array(messageData);
      const decodedMessage = msgpack.decode(uint8Message);

      const user = decodedMessage.data[0];

      if (user?.displayName) {
        state.set("user", user);
      }
    }

    return messageData;
  }

  Object.defineProperty(MessageEvent.prototype, "data", {
    get: overrideDataGetter,
  });
};
