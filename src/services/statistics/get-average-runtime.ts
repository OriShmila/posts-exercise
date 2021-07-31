import { clientConnection } from "../../server";
import { StatisticsQuery } from "../../models";

export const getAverageRuntime = (methodName: string) =>
  StatisticsQuery.fetchAverageRuntimeOf(methodName, clientConnection);
