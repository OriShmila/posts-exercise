import Events from "events";

const eventEmitter = new Events.EventEmitter();

export const handleAppendRuntimeCalled = async (
  eventName: string,
  save: () => Promise<void>
) => {
  await save();

  eventEmitter.emit(eventName);
};
