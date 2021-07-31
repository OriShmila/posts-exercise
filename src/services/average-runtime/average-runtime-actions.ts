import { AverageRuntimeType } from "../../models";
import { AverageRuntime, Runtime } from "./types";

const runtimeDefinition = {
  timesNumber: 0,
  time: 0,
};

export class AverageRuntimeActions implements AverageRuntime {
  private methodName: string;
  private isCompleteSaving: boolean = true;
  private saveQuery: (averageRuntimeRow: AverageRuntimeType) => Promise<void>;
  private newRuntime: Runtime = runtimeDefinition;

  constructor(
    methodName: string,
    saveQuery: (averageRuntimeRow: AverageRuntimeType) => Promise<void>
  ) {
    this.methodName = methodName;
    this.saveQuery = saveQuery;
  }

  private save = async () => {
    if (this.isCompleteSaving === false) {
      return;
    }

    this.isCompleteSaving = false;

    await this.saveQuery({
      methodName: this.methodName,
      ...this.newRuntime,
    });

    this.newRuntime = runtimeDefinition;
  };

  append = async (time: number) => {
    this.newRuntime.timesNumber++;
    this.newRuntime.time += time;

    await this.save();
  };

  onCompleteSaving = () => {
    this.isCompleteSaving = true;

    if (this.newRuntime.timesNumber === 0) {
      return;
    }

    this.save();
  };
}
