import Events from "events";
import { AverageRuntime } from "./types";

const eventEmitter = new Events.EventEmitter();

export class AverageRuntimeWrapper {
  private readonly COMPLETE_EXTENSION = "-complete";
  private methodName: string;
  private avarageRuntime: AverageRuntime;
  private executeCallback: any;

  constructor(
    averageRuntime: AverageRuntime,
    methodName: string,
    executeCallback: () => Promise<unknown>
  ) {
    this.methodName = methodName;
    this.executeCallback = executeCallback;
    this.avarageRuntime = averageRuntime;

    this.initEvent();
  }

  private initEvent() {
    eventEmitter.on(
      this.methodName + this.COMPLETE_EXTENSION,
      this.avarageRuntime.onCompleteSaving
    );
  }

  private calculateTime(start: [number, number]) {
    const time = process.hrtime(start);

    return (time[0] * 1e9 + time[1]) / 1e9;
  }
  async execute() {
    const startTime = process.hrtime();

    const result = await this.executeCallback();
    const time = this.calculateTime(startTime);

    this.appendAverageRuntime(time);
    return result;
  }

  private async appendAverageRuntime(time: number) {
    await this.avarageRuntime.append(time);
    eventEmitter.emit(this.methodName + this.COMPLETE_EXTENSION);
  }
}
