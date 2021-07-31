import { clientConnection } from "../../server";
import { CreatorsQuery } from "../../models";

export const getPostsNumber = () => CreatorsQuery.fetchTopTen(clientConnection);
