import { clientConnection } from "../../server";
import { PostsQuery } from "../../models";

export const getPostsNumber = () => PostsQuery.fetchPostCount(clientConnection);
