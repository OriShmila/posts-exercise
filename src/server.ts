import express from "express";
import cors from "cors";
import initDb from "./models";
import { Pool } from "pg";

const server = express();
const port = process.env.PORT || 3000;

export let clientConnection: Pool;
(async () => await initDb(process.env.POSTGRES_CONNECTION_STRING))();

server.use(express.json());
server.use(cors());

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
