import express from "express";
import cors from "cors";
import initDb from "./models";
import pg, { Pool } from "pg";
import Routs from "./api";

pg.defaults.ssl = {
  rejectUnauthorized: false,
};

enum Pathes {
  POSTS = "/posts",
  POSTS_NUMBER = "/postsnumber",
  STATISTICS = "/statistics",
}
const server = express();
const port = process.env.PORT || 3000;

export let clientConnection: Pool;
(async () =>
  (clientConnection = await initDb(
    process.env.POSTGRES_CONNECTION_STRING
  )))();

server.use(express.json());
server.use(cors());
server.use(Pathes.POSTS, Routs.Posts);
server.use(Pathes.POSTS_NUMBER, Routs.PostsNumber);
server.use(Pathes.STATISTICS, Routs.Statistics);

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
