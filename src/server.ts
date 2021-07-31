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
    process.env.POSTGRES_CONNECTION_STRING ||
      `postgres://hcyiowfmiindvk:ff3188920c4c5c6aa9ccf2d46c4fa937636f1b05d98308746e26d05f37b8ca23@ec2-54-158-222-248.compute-1.amazonaws.com:5432/d1l4p8g32nnv2g`
  )))();

server.use(express.json());
server.use(cors());
server.use(Pathes.POSTS, Routs.Posts);
server.use(Pathes.POSTS_NUMBER, Routs.PostsNumber);
server.use(Pathes.STATISTICS, Routs.Statistics);

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
