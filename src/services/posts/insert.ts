import {
  PostsQuery,
  AverageRuntimeType,
  StatisticsQuery,
  Post,
} from "../../models";
import { clientConnection } from "../../server";
import {
  AverageRuntimeActions,
  AverageRuntimeWrapper,
} from "../average-runtime";

const INSERT_METHOD = "insert-post";

const saveStatisticsQuery = async (averageRuntimeRow: AverageRuntimeType) =>
  StatisticsQuery.upsertAverageRuntime(clientConnection, averageRuntimeRow);

const insertAverageRuntime = new AverageRuntimeActions(
  INSERT_METHOD,
  saveStatisticsQuery
);

const averageRuntimeWrapper = new AverageRuntimeWrapper(
  insertAverageRuntime,
  INSERT_METHOD
);

export const insert = (post: Post) => {
  return averageRuntimeWrapper.execute(() =>
    PostsQuery.insert(clientConnection, post)
  );
};
