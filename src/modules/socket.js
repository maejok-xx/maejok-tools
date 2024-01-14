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

      const isUserData =
        decodedMessage.id === 9 &&
        user?.id !== null &&
        user?.displayName !== null &&
        user?.joined !== null;

      const userDataSet = state.get("user") !== null;

      if (isUserData && !userDataSet) {
        state.set("user", user);
      }
    }

    return messageData;
  }

  Object.defineProperty(MessageEvent.prototype, "data", {
    get: overrideDataGetter,
  });
};
