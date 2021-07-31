import {
  PostsQuery,
  AverageRuntimeType,
  StatisticsQuery,
  Post,
} from "../../models";
import { clientConnection } from "../../server";
import { AverageRuntimeActions } from "../average-runtime/average-runtime-actions";
import { AverageRuntimeWrapper } from "../average-runtime/average-runtime-wrapper";

const INSERT_METHOD = "insert-post";

const saveStatisticsQuery = async (averageRuntimeRow: AverageRuntimeType) =>
  StatisticsQuery.upsertAverageRuntime(clientConnection, averageRuntimeRow);

const insertAverageRuntime = new AverageRuntimeActions(
  INSERT_METHOD,
  saveStatisticsQuery
);

export const insertList = (post: Post) => {
  const averageRuntimeWrapper = new AverageRuntimeWrapper(
    insertAverageRuntime,
    INSERT_METHOD,
    () => PostsQuery.insert(clientConnection, post)
  );

  return averageRuntimeWrapper.execute();
};
