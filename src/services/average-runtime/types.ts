export interface Runtime {
  timesNumber: number;
  time: number;
}

export interface AverageRuntimeBaseActions {
  append: (time: number) => Promise<void>;
  onCompleteSaving: () => void;
}
