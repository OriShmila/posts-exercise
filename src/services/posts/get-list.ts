import { PostsQuery, AverageRuntimeType, StatisticsQuery } from "../../models";
import { clientConnection } from "../../server";
import { AverageRuntimeActions } from "../average-runtime/average-runtime-actions";
import { AverageRuntimeWrapper } from "../average-runtime/average-runtime-wrapper";

const GET_METHOD = "get-post-list";

const saveStatisticsQuery = async (averageRuntimeRow: AverageRuntimeType) =>
  StatisticsQuery.upsertAverageRuntime(clientConnection, averageRuntimeRow);

const getListAverageRuntime = new AverageRuntimeActions(
  GET_METHOD,
  saveStatisticsQuery
);

export const getPostList = (offset: number, limit: number) => {
  const averageRuntimeWrapper = new AverageRuntimeWrapper(
    getListAverageRuntime,
    GET_METHOD,
    () => PostsQuery.fetch(clientConnection, offset, limit)
  );
  return averageRuntimeWrapper.execute();
};
