import { PostsQuery, AverageRuntimeType, StatisticsQuery } from "../../models";
import {
  AverageRuntimeActions,
  AverageRuntimeWrapper,
} from "../average-runtime";
import { clientConnection } from "../../server";

const GET_METHOD = "get-post-list";

const saveStatisticsQuery = async (averageRuntimeRow: AverageRuntimeType) =>
  StatisticsQuery.upsertAverageRuntime(clientConnection, averageRuntimeRow);

const getListAverageRuntime = new AverageRuntimeActions(
  GET_METHOD,
  saveStatisticsQuery
);

const averageRuntimeWrapper = new AverageRuntimeWrapper(
  getListAverageRuntime,
  GET_METHOD
);

export const getList = (offset?: number, limit?: number) => {
  return averageRuntimeWrapper.execute(() =>
    PostsQuery.fetch(clientConnection, limit, offset)
  );
};
