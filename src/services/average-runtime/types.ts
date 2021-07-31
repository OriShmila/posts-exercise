export interface Runtime {
  timesNumber: number;
  time: number;
}

export interface AverageRuntime {
  append: (time: number) => Promise<void>;
  onCompleteSaving: () => void;
}
