import Events from "events";

const eventEmitter = new Events.EventEmitter();

export const initAverageRuntimeEvent = (
  eventName: string,
  callback: () => void
) => {
  eventEmitter.on(eventName, callback);
};
