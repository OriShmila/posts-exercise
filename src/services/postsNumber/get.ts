import { clientConnection } from "../../server";
import { PostsQuery } from "../../models";

export const get = () => PostsQuery.fetchPostCount(clientConnection);
