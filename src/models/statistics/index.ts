import { type } from "os";
import { fetchAverageRuntimeOf } from "./fetch-average-runtime";
import {
  upsertAverageRuntime,
  AverageRuntimeType,
} from "./upsert-average-runtime";

export default { fetchAverageRuntimeOf, upsertAverageRuntime };
export type { AverageRuntimeType };
