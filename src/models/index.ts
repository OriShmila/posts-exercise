import PostsQuery, { Post } from "./posts";
import CreatorsQuery from "./creators";
import StatisticsQuery, { AverageRuntimeType } from "./statistics";
import { initDb } from "./init";

export default initDb;
export { PostsQuery, CreatorsQuery, StatisticsQuery };
export type { AverageRuntimeType, Post };
