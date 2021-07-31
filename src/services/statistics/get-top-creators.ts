import { clientConnection } from "../../server";
import { CreatorsQuery } from "../../models";

export const getTopCreators = () => CreatorsQuery.fetchTopTen(clientConnection);
